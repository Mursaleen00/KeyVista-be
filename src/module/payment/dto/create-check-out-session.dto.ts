import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCheckOutSessionDto {
  @ApiProperty({
    name: 'amount',
    example: '200',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    name: 'productId',
    example: '67d954ecb76441fea9492f4d',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
