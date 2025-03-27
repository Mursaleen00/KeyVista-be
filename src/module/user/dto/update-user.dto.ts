import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  @ApiProperty({ example: 'Pakistan' })
  country: string;

  @ApiProperty({ example: 'Karachi' })
  city: string;

  @ApiProperty({ example: '+923001234567' })
  phoneNumber: string;

  @ApiProperty({ example: 'https://placehold.co/600x400' })
  profilePicture: string;
}
