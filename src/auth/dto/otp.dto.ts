import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class OTPDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MaxLength(6)
  otp: string;
}
