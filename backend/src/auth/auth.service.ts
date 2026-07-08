// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  async sendOtp(phone: string) {
    // Check if user exists
    let [user] = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
    
    // In a real app, send OTP via SMS (e.g. Interakt, Twilio)
    // Here we stub it and just return success.
    return { success: true, message: 'OTP sent successfully', isNewUser: !user };
  }

  async adminLogin(email: string, password: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    return this.issueToken(user);
  }

  async verifyOtp(phone: string, otp: string, name?: string, role: string = 'tourist') {
    // Hardcoded for testing/onboarding
    if (otp !== '123456') {
      throw new UnauthorizedException('Invalid OTP');
    }

    let [user] = await db.select().from(users).where(eq(users.phone, phone)).limit(1);

    if (user) {
      // Existing user: 
      // If a tourist logs into the provider portal, update their role to provider-pending
      // so they can set up their business. We don't overwrite if they are already a full provider.
      if (role === 'provider' && user.role === 'tourist') {
        const [updated] = await db.update(users).set({ role: 'provider-pending' }).where(eq(users.id, user.id)).returning();
        user = updated;
      }
    } else {
      // Create new user if not exists
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('random_password_' + Date.now(), salt); // Dummy pass
      
      let firstName = '';
      let lastName = '';
      
      if (name) {
        const nameParts = name.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }
      
      const newUserRole = role === 'provider' ? 'provider-pending' : 'tourist';
      
      const [newUser] = await db.insert(users).values({
        phone,
        passwordHash,
        role: newUserRole,
        firstName,
        lastName,
      }).returning();
      
      user = newUser;
    }

    return this.issueToken(user);
  }

  issueToken(user: any) {
    const payload = { sub: user.id, email: user.email, phone: user.phone, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      hasSetup: !!(user.touristConfig || user.providerConfig),
      profile: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        touristConfig: user.touristConfig,
        providerConfig: user.providerConfig,
      }
    };
  }
}
