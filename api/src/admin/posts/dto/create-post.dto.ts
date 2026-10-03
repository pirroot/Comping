import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug باید فقط شامل حروف کوچک، عدد و خط تیره باشد',
  })
  slug: string;

  @MaxLength(255, { message: 'عنوان نباید بیشتر از 255 کاراکتر باشد.' })
  @IsNotEmpty({ message: 'عنوان خالی است.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'متن مقاله خالی است.' })
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  image?: string;
}
