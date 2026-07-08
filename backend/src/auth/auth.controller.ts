// backend/src/auth/auth.controller.ts
import { Controller, Post, Body, Inject, BadRequestException, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post('provider/send-otp')
  async sendOtp(@Body() dto: { phone: string }) {
    if (!dto.phone) throw new BadRequestException('Phone number is required');
    return this.authService.sendOtp(dto.phone);
  }

  @Post('provider/verify-otp')
  async verifyOtp(@Body() dto: { phone: string, otp: string, name?: string }) {
    if (!dto.phone || !dto.otp) throw new BadRequestException('Phone and OTP required');
    return this.authService.verifyOtp(dto.phone, dto.otp, dto.name);
  }

  @Put('provider/:id/setup')
  async setupProvider(@Param('id') id: string, @Body() dto: { role: string, profileConfig: any }) {
    if (!dto.role || !dto.profileConfig) throw new BadRequestException('Role and profile config required');
    
    // Ensure the role is one of the valid provider roles
    if (!['homestay', 'driver', 'cafe'].includes(dto.role)) {
      throw new BadRequestException('Invalid service provider role');
    }

    const [updatedUser] = await db.update(users)
      .set({ 
        role: dto.role, 
        profileConfig: dto.profileConfig 
      })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      throw new BadRequestException('User not found');
    }

    // After setup, return a fresh token reflecting the new role
    return this.authService.issueToken(updatedUser);
  }

  @Post('provider/register')
  async registerProvider(@Body() dto: RegisterDto) {
    if (dto.role === 'tourist') {
      throw new BadRequestException('Use user registration endpoint for tourists');
    }
    return this.authService.register(dto);
  }

  @Post('provider/login')
  async loginProvider(@Body() dto: LoginDto) {
    return this.authService.validateAndSign(dto.email, dto.password, 'PROVIDER');
  }

  @Post('user/login')
  async loginUser(@Body() dto: LoginDto) {
    return this.authService.validateAndSign(dto.email, dto.password, 'USER');
  }
}
