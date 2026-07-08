// backend/src/modules/homestay/homestay.controller.ts
import { Controller, Body, UseGuards, SetMetadata, Put, Param, Get, NotFoundException } from '@nestjs/common';
import { RolesGuard } from '../../auth/guards/roles.guard.js';
import { db } from '../../db/index.js';
import { users } from '../../db/schema.js';
import { eq, and } from 'drizzle-orm';

@Controller('api/homestay')
export class HomestayController {

  @Get('list')
  async getList() {
    const allHomestays = await db.select().from(users).where(eq(users.role, 'homestay'));
    return allHomestays.map(h => ({
      id: h.id,
      propertyName: (h.providerConfig as any)?.propertyName || h.firstName,
      providerConfig: h.providerConfig || {},
    }));
  }

  @Get(':id/profile')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['HOMESTAY', 'homestay'])
  async getProfile(@Param('id') id: string) {
    const [homestay] = await db.select().from(users).where(and(eq(users.id, id), eq(users.role, 'homestay'))).limit(1);
    if (!homestay) {
      throw new Error('Homestay not found');
    }
    return {
      id: homestay.id,
      email: homestay.email,
      propertyName: (homestay.providerConfig as any)?.propertyName || homestay.firstName,
      providerConfig: homestay.providerConfig || {},
    };
  }

  @Get('public/:id')
  async getPublicProfile(@Param('id') id: string) {
    const [homestay] = await db.select().from(users).where(and(eq(users.id, id), eq(users.role, 'homestay'))).limit(1);
    if (!homestay) {
      throw new NotFoundException('Homestay not found');
    }
    return {
      id: homestay.id,
      propertyName: (homestay.providerConfig as any)?.propertyName || homestay.firstName,
      providerConfig: homestay.providerConfig || {},
    };
  }

  @Put(':id/setup')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['HOMESTAY', 'homestay'])
  async saveSetup(@Param('id') id: string, @Body() config: any) {
    await db.update(users)
      .set({ providerConfig: config })
      .where(eq(users.id, id));
    return { message: "Setup completed successfully." };
  }
}
