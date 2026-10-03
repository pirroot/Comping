import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID(4)
  userId: string;

  @IsUUID(4)
  productId: string;

  @IsOptional()
  @IsUUID(4)
  parentId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  star?: number;
}
