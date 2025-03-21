import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'example@yopmail.com', name: 'email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123Example!' })
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
