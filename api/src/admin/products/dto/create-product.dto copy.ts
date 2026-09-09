import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
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
  @IsNumber({}, { message: 'باید عدد باشد.' })
  @Min(0, { message: 'قیمت نمی‌تواند منفی باشد' })
  price: number;

  @IsNotEmpty({ message: 'توضیحات محصول خالی است' })
  @IsString({ message: 'باید رشته متنی باشد' })
  @MinLength(100, { message: 'توضیحات باید بیشتر از 100 کاراکتر باشد.' })
  description: string;

  @IsNotEmpty({ message: 'محصول باید یک دسته بندی مشخص داشته باشد.' })
  @IsUUID(4, { message: 'شناسه دسته بندی معتبر نیست' })
  categoryId: string;

  @IsNotEmpty({ message: 'باید یک امکان برای محصول داشته باشد.' })
  @ValidateNested()
  @Type(() => ProductFeatureDto)
  features: ProductFeatureDto;
}
