// backend/src/modules/homestay/homestay.controller.ts
import { Controller, Post, Body, UseGuards, SetMetadata, Put, Param, Get, ConflictException, NotFoundException } from '@nestjs/common';
import { RolesGuard } from '../../auth/guards/roles.guard.js';
import { db } from '../../db/index.js';
import { homestays } from '../../db/schema.js';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

@Controller('api/homestay')
export class HomestayController {

  @Post('register')
  async register(@Body() dto: any) {
    const [existing] = await db.select().from(homestays).where(eq(homestays.email, dto.email)).limit(1);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const [newHomestay] = await db.insert(homestays).values({
      email: dto.email,
      passwordHash,
      propertyName: dto.propertyName,
    }).returning();
    
    return { message: "Registration successful", id: newHomestay.id };
  }
  @Get('list')
  async getList() {
    const allHomestays = await db.select().from(homestays);
    return allHomestays.map(h => ({
      id: h.id,
      propertyName: h.propertyName,
      essentialsConfig: h.essentialsConfig || {},
    }));
  }

  @Get(':id/profile')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['HOMESTAY'])
  async getProfile(@Param('id') id: string) {
    const [homestay] = await db.select().from(homestays).where(eq(homestays.id, id)).limit(1);
    if (!homestay) {
      throw new Error('Homestay not found');
    }
    return {
      id: homestay.id,
      email: homestay.email,
      propertyName: homestay.propertyName,
      essentialsConfig: homestay.essentialsConfig || {},
    };
  }
  @Get('public/:id')
  async getPublicProfile(@Param('id') id: string) {
    const [homestay] = await db.select().from(homestays).where(eq(homestays.id, id)).limit(1);
    if (!homestay) {
      throw new NotFoundException('Homestay not found');
    }
    return {
      id: homestay.id,
      propertyName: homestay.propertyName,
      essentialsConfig: homestay.essentialsConfig || {},
    };
  }

  @Put(':id/setup')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['HOMESTAY'])
  async saveSetup(@Param('id') id: string, @Body() config: any) {
    await db.update(homestays)
      .set({ essentialsConfig: config })
      .where(eq(homestays.id, id));
    return { message: "Setup completed successfully." };
  }
}
