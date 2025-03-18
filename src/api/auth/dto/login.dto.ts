import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'example@yopmail.com', name: 'email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123Password!@#' })
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
