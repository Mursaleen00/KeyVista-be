import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { EmailDto } from './email.dto';

export class RegisterDto extends EmailDto {
  @ApiProperty({ example: '123Password!@#' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Example' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'https://placehold.co/600x400' })
  @IsString()
  @IsNotEmpty()
  profilePicture: string;

  @ApiProperty({ example: 'Pakistan' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'Karachi' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: '+923001234567' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  agreeWithPT: boolean;
}
