import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class CreateCategoryDto {
  @MaxLength(255, { message: 'عنوان نباید بیشتر از 255 کاراکتر باشد.' })
  @IsNotEmpty({ message: 'عنوان خالی است.' })
  title: string;

  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug باید فقط شامل حروف کوچک، عدد و خط تیره باشد',
  })
  slug: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUUID(4)
  parentId?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
