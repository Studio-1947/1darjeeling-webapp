// backend/src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private reflector: Reflector,
    @Inject(JwtService) private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // Route is public

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token format');
    }

    const token = authHeader.split(' ')[1];
    try {
      // Decode and verify the payload signature
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'fallback_secret',
      });
      
      request.user = payload;
      // Strict matching: Does the token role exist in the route's allowed roles?
      return requiredRoles.includes(payload.role);
    } catch {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
