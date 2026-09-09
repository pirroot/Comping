import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug باید فقط شامل حروف کوچک، عدد و خط تیره باشد',
  })
  slug: string;

  @MaxLength(255, { message: 'عنوان نباید بیشتر از 255 کاراکتر باشد.' })
  @IsNotEmpty({ message: 'عنوان خالی است.' })
  title: string;

  @IsNotEmpty({ message: 'متن مقاله خالی است.' })
  content: string;

  @IsNumber()
  @IsOptional()
  starts?: number;

  authorId: string;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
