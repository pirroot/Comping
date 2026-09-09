import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @MaxLength(256, { message: 'کاراکتر شما بیشتر از حد مجاز است.' })
  @IsOptional()
  name: string;

  @MaxLength(256, { message: 'کاراکتر شما بیشتر از حد مجاز است.' })
  @IsOptional()
  family: string;

  @MaxLength(256, { message: 'کاراکتر شما بیشتر از حد مجاز است.' })
  @IsOptional()
  username: string;
}
