import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { HomestayController } from './modules/homestay/homestay.controller.js';
import { UsersController } from './modules/users/users.controller.js';
import { DriverController } from './modules/driver/driver.controller.js';

@Module({
  imports: [AuthModule],
  controllers: [HomestayController, UsersController, DriverController],
  providers: [],
})
export class AppModule {}
