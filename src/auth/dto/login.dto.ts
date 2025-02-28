import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123Example!' })
  @IsString()
  @IsStrongPassword()
  password: string;
}
