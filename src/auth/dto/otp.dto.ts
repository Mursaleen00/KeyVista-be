import { IsEmail, IsString, MaxLength } from 'class-validator';

export class OTPDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(6)
  otp: string;
}
