import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateReviewsDto {
  @ApiProperty({
    description: 'Property Id',
    example: '6402500518089c46902217b1',
  })
  @IsString()
  propertyId: string;

  @ApiProperty({
    description: 'Description',
    example: 'Good',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Rating',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  rating: number;
}
