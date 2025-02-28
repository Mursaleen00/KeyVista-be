import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'example@yopmail.com', name: 'email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123Password!@#' })
  @IsString()
  @IsStrongPassword()
  password: string;
}
