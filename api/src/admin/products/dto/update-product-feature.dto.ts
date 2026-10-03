import { PartialType } from '@nestjs/mapped-types';
import { ProductFeatureDto } from './create-product.dto copy';

export class UpdateProductFeatureDto extends PartialType(ProductFeatureDto) {}
