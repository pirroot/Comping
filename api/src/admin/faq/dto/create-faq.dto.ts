import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty({ message: 'نیاز مند سوال هستیم :؟' })
  @MaxLength(500, { message: 'بیشتر از 500 کاراکتر مجاز نیست.' })
  question: string;

  @MaxLength(500, { message: 'بیشتر از 500 کاراکتر مجاز نیست.' })
  @IsNotEmpty({ message: 'نیازمند یک جواب خوب هستیم :؟' })
  @IsString()
  answer: string;
}
