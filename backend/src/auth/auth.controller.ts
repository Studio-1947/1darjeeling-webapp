// backend/src/auth/auth.controller.ts
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // A simple class validation file for email/password

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post('login/user')
  async loginUser(@Body() dto: LoginDto) {
    return this.authService.validateAndSign(dto.email, dto.password, 'USER');
  }

  @Post('login/homestay')
  async loginHomestay(@Body() dto: LoginDto) {
    return this.authService.validateAndSign(dto.email, dto.password, 'HOMESTAY');
  }

  @Post('login/driver')
  async loginDriver(@Body() dto: LoginDto) {
    return this.authService.validateAndSign(dto.email, dto.password, 'DRIVER');
  }
}
