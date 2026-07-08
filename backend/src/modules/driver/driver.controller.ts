import { Controller, Body, Get, Put, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { db } from '../../db/index.js';
import { users } from '../../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { RolesGuard } from '../../auth/guards/roles.guard.js';

@Controller('api/driver')
export class DriverController {

  @Get('list')
  async getList() {
    const allDrivers = await db.select().from(users).where(eq(users.role, 'driver'));
    return allDrivers.map(d => ({
      id: d.id,
      fullName: (d.profileConfig as any)?.fullName || d.firstName,
      vehicleType: (d.profileConfig as any)?.vehicleType,
      isAvailable: (d.profileConfig as any)?.isAvailable || false,
      profileConfig: d.profileConfig || {},
    }));
  }

  @Get(':id/profile')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['DRIVER', 'driver'])
  async getProfile(@Param('id') id: string) {
    const [driver] = await db.select().from(users).where(and(eq(users.id, id), eq(users.role, 'driver'))).limit(1);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return {
      id: driver.id,
      email: driver.email,
      fullName: (driver.profileConfig as any)?.fullName || driver.firstName,
      licenseNumber: (driver.profileConfig as any)?.licenseNumber,
      vehicleType: (driver.profileConfig as any)?.vehicleType,
      profileConfig: driver.profileConfig || {},
    };
  }

  @Put(':id/setup')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['DRIVER', 'driver'])
  async updateSetup(@Param('id') id: string, @Body() config: any) {
    await db.update(users)
      .set({ profileConfig: config })
      .where(eq(users.id, id));
    return { success: true };
  }
}
