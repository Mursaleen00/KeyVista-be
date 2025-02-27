import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class OTPDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  otp: string;
}
