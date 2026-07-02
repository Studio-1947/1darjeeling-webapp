// backend/src/modules/homestay/homestay.controller.ts
import { Controller, Post, UseGuards, SetMetadata } from '@nestjs/common';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('api/homestay/erp')
@UseGuards(RolesGuard)
export class HomestayController {

  @Post('setup')
  @SetMetadata('roles', ['HOMESTAY']) // Only tokens generated via login/homestay pass here
  async saveSetup() {
    return { message: "ERP data securely saved." };
  }
}
