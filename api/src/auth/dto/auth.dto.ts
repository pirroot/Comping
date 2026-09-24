import { IsString, Matches } from 'class-validator';

export class AuthDto {
  @IsString()
  @Matches(/^09\d{9}$/, {
    message: 'شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد.',
  })
  phone: string;
}
