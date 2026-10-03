import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  key: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  group?: string;
}
