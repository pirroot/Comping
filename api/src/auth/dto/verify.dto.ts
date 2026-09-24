import { IsString, Matches, Length } from 'class-validator';

export class VerifyDto {
  @IsString()
  @Matches(/^09\d{9}$/, {
    message: 'شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد.',
  })
  phone: string;

  @IsString()
  @Length(6, 6, { message: 'کد باید ۶ رقمی باشد.' })
  @Matches(/^\d{6}$/, { message: 'کد فقط باید عدد باشد.' })
  code: string;
}
