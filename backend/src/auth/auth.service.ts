// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db } from '../db';
import { users, homestays, drivers } from '../db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  async validateAndSign(email: string, pass: string, role: 'USER' | 'HOMESTAY' | 'DRIVER') {
    let targetRecord: any = null;

    // Isolate database lookups based on the requested login route
    if (role === 'USER') {
      [targetRecord] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    } else if (role === 'HOMESTAY') {
      [targetRecord] = await db.select().from(homestays).where(eq(homestays.email, email)).limit(1);
    } else if (role === 'DRIVER') {
      [targetRecord] = await db.select().from(drivers).where(eq(drivers.email, email)).limit(1);
    }

    if (!targetRecord) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify the hashed password
    const isMatch = await bcrypt.compare(pass, targetRecord.passwordHash || targetRecord.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Issue a token locked to this specific identity and role
    const payload = { sub: targetRecord.id, email: targetRecord.email, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
