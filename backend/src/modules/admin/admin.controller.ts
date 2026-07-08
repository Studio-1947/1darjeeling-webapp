import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { db } from '../../db/index.js';
import { users } from '../../db/schema.js';
import { desc } from 'drizzle-orm';
import { RolesGuard } from '../../auth/guards/roles.guard.js';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('api/admin')
@UseGuards(RolesGuard)
export class AdminController {
  
  @Get('users')
  @Roles('admin')
  async getAllUsers() {
    const allUsers = await db.select({
      id: users.id,
      email: users.email,
      phone: users.phone,
      firstName: users.firstName,
      lastName: users.lastName,
      role: users.role,
      touristConfig: users.touristConfig,
      providerConfig: users.providerConfig,
      createdAt: users.createdAt
    }).from(users).orderBy(desc(users.createdAt));
    
    // Segregate for convenience (a dual-role user might appear in both lists)
    const tourists = allUsers.filter(u => u.role === 'tourist' || u.touristConfig);
    const providers = allUsers.filter(u => ['homestay', 'driver', 'cafe', 'provider-pending'].includes(u.role) || u.providerConfig);
    
    console.log(`Admin fetching users: total=${allUsers.length}, tourists=${tourists.length}, providers=${providers.length}`);
    
    return {
      total: allUsers.length,
      tourists,
      providers
    };
  }
}
