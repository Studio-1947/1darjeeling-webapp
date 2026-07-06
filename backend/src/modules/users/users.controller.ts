import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { db } from '../../db/index.js';
import { users } from '../../db/schema.js';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

@Controller('api/users')
export class UsersController {
  @Post('register')
  async register(@Body() dto: any) {
    const [existing] = await db.select().from(users).where(eq(users.email, dto.email)).limit(1);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const [newUser] = await db.insert(users).values({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
    }).returning();
    
    return { message: "Registration successful", id: newUser.id };
  }
}
