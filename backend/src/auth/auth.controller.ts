// backend/src/auth/auth.controller.ts
import { Controller, Post, Body, Inject, BadRequestException, Param, Put, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post('send-otp')
  async sendOtp(@Body() dto: { phone: string }) {
    if (!dto.phone) throw new BadRequestException('Phone number is required');
    return this.authService.sendOtp(dto.phone);
  }

  @Post('admin-login')
  async adminLogin(@Body() dto: any) {
    if (!dto.email || !dto.password) throw new BadRequestException('Email and password required');
    return this.authService.adminLogin(dto.email, dto.password);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: { phone: string, otp: string, name?: string, role?: string }) {
    if (!dto.phone || !dto.otp) throw new BadRequestException('Phone and OTP required');
    return this.authService.verifyOtp(dto.phone, dto.otp, dto.name, dto.role || 'tourist');
  }

  @Put(':id/setup')
  @UseGuards(JwtAuthGuard)
  async setupProvider(@Param('id') id: string, @Body() dto: { role: string, profileConfig: any }, @Req() request: any) {
    if (request.user.sub !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    
    if (!dto.role || !dto.profileConfig) throw new BadRequestException('Role and profile config required');
    
    if (!['homestay', 'driver', 'cafe', 'tourist', 'provider-pending'].includes(dto.role)) {
      throw new BadRequestException('Invalid service provider role');
    }

    const updateData: any = {};
    if (dto.role === 'tourist') {
      updateData.touristConfig = dto.profileConfig;
    } else {
      updateData.providerConfig = dto.profileConfig;
      updateData.role = dto.role; // Upgrade their role to the provider role
    }

    const [updatedUser] = await db.update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      throw new BadRequestException('User not found');
    }

    return this.authService.issueToken(updatedUser);
  }

}
