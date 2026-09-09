import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
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
  description: string;

  @IsOptional()
  parentId?: string;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
