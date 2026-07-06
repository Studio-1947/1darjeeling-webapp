import { Controller, Post, Body, Get, Put, Param, UseGuards, SetMetadata, ConflictException } from '@nestjs/common';
import { db } from '../../db/index.js';
import { drivers } from '../../db/schema.js';
import * as bcrypt from 'bcrypt';
import { eq, or } from 'drizzle-orm';
import { RolesGuard } from '../../auth/guards/roles.guard.js';

@Controller('api/driver')
export class DriverController {

  @Post('register')
  async register(@Body() dto: any) {
    const [existing] = await db.select().from(drivers).where(
      or(
        eq(drivers.email, dto.email),
        eq(drivers.licenseNumber, dto.licenseNumber)
      )
    ).limit(1);

    if (existing) {
      if (existing.email === dto.email) {
        throw new ConflictException('Email already registered');
      }
      if (existing.licenseNumber === dto.licenseNumber) {
        throw new ConflictException('License number already registered');
      }
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const [newDriver] = await db.insert(drivers).values({
      email: dto.email,
      passwordHash,
      fullName: dto.fullName,
      licenseNumber: dto.licenseNumber,
      vehicleType: dto.vehicleType,
    }).returning();
    
    return { message: "Registration successful", id: newDriver.id };
  }

  @Get('list')
  async getList() {
    const allDrivers = await db.select().from(drivers);
    return allDrivers.map(d => ({
      id: d.id,
      fullName: d.fullName,
      vehicleType: d.vehicleType,
      isAvailable: d.isAvailable,
      profileConfig: d.profileConfig || {},
    }));
  }

  @Get(':id/profile')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['DRIVER'])
  async getProfile(@Param('id') id: string) {
    const [driver] = await db.select().from(drivers).where(eq(drivers.id, id)).limit(1);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return {
      id: driver.id,
      email: driver.email,
      fullName: driver.fullName,
      licenseNumber: driver.licenseNumber,
      vehicleType: driver.vehicleType,
      profileConfig: driver.profileConfig || {},
    };
  }

  @Put(':id/setup')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['DRIVER'])
  async updateSetup(@Param('id') id: string, @Body() config: any) {
    await db.update(drivers)
      .set({ profileConfig: config })
      .where(eq(drivers.id, id));
    return { success: true };
  }
}
