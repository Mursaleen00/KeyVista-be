import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EmailDto } from './email.dto';

export class OTPDto extends EmailDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @MaxLength(6)
  @IsNotEmpty()
  otp: string;
}
