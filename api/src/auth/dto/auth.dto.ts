import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'رمز عبور شما باید بیشتر از 8 کاراکتر باشد.' })
  password: string;
}
