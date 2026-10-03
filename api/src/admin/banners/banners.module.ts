import { Module } from '@nestjs/common';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { UploadsModule } from '../../uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
