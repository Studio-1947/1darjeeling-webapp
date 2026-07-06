import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { HomestayController } from './modules/homestay/homestay.controller.js';

@Module({
  imports: [AuthModule],
  controllers: [HomestayController],
  providers: [],
})
export class AppModule {}
