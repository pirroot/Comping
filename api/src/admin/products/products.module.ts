import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { StoreProductsController } from './store-products.controller';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [ProductsController, StoreProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
