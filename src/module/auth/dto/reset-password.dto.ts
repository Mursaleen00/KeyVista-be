import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { EmailDto } from './email.dto';

export class ResetPasswordDto extends EmailDto {
  @ApiProperty({ example: '123Example!' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
