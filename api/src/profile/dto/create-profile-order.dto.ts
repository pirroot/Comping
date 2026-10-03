import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
  IsIn,
  Min,
  ValidateNested,
} from 'class-validator';

class ProfileOrderItemDto {
  @IsUUID()
  productId: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateProfileOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProfileOrderItemDto)
  items: ProfileOrderItemDto[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  shippingName: string;

  @IsString()
  @Matches(/^09\d{9}$/)
  shippingPhone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  shippingAddress: string;

  @IsString()
  @Matches(/^\d{10}$/)
  postalCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  shippingUnit?: string;

  @IsIn(['normal', 'express'])
  shippingMethod: 'normal' | 'express';
}
