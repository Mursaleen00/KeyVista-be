import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResendOTPDto {
  @ApiProperty({ example: 'example@yopmail.com', name: 'email' })
  @IsString()
  @IsEmail()
  email: string;
}
