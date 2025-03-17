import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'Password@123',
    description: 'Password',
  })
  password: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: '123Password!@#' })
  oldPassword: string;
}
