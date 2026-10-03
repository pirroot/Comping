import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { UploadsModule } from '../../uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
