import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomestayController } from './modules/homestay/homestay.controller';

@Module({
  imports: [AuthModule],
  controllers: [HomestayController],
  providers: [],
})
export class AppModule {}
