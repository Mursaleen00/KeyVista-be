import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { EmailDto } from './email.dto';

export class LoginDto extends EmailDto {
  @ApiProperty({ example: '123Password!@#' })
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
