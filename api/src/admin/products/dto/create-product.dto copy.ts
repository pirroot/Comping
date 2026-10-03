import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class ProductFeatureDto {
  @IsNotEmpty({ message: 'کلید ویژگی نباید خالی باشد' })
  @IsString()
  key: string;

  @IsNotEmpty({ message: 'مقدار ویژگی نباید خالی باشد' })
  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsNotEmpty({ message: 'باید محصول، اسلاگ داشته باشد.' })
  @IsString({ message: 'باید رشته متنی باشد' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'اسلاگ فقط می‌تواند شامل حروف کوچک، اعداد و خط تیره باشد',
  })
  slug: string;

  @IsNotEmpty({ message: 'عنوان محصول باید خالی نباشد.' })
  @IsString({ message: 'باید رشته متنی باشد' })
  @MaxLength(256, { message: 'باید کمتر از 256 کاراکتر باشد' })
  title: string;

  @IsNotEmpty({ message: 'قیمت محصول نباید خالی باشد' })
  @Type(() => Number)
  @IsNumber({}, { message: 'باید عدد باشد.' })
  @Min(0, { message: 'قیمت نمی‌تواند منفی باشد' })
  price: number;

  @IsNotEmpty({ message: 'توضیحات محصول خالی است' })
  @IsString({ message: 'باید رشته متنی باشد' })
  @MinLength(20, { message: 'توضیحات محصول خیلی کوتاه است.' })
  description: string;

  @IsNotEmpty({ message: 'محصول باید یک دسته بندی مشخص داشته باشد.' })
  @IsUUID(4, { message: 'شناسه دسته بندی معتبر نیست' })
  categoryId: string;

  @IsOptional()
  @IsUUID(4, { message: 'شناسه برند معتبر نیست' })
  brandId?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  isActive?: boolean;

  @IsNotEmpty({ message: 'باید ویژگی برای محصول ثبت شود.' })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductFeatureDto)
  features: ProductFeatureDto[];
}
