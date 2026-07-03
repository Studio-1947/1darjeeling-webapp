import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomestayController } from './modules/homestay/homestay.controller';
import { UsersController } from './modules/users/users.controller';
import { DriverController } from './modules/driver/driver.controller';

@Module({
  imports: [AuthModule],
  controllers: [HomestayController, UsersController, DriverController],
  providers: [],
})
export class AppModule {}
