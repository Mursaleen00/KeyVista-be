import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
