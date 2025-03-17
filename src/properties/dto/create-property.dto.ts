import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PropertyCondition } from 'src/types/enum/property-condition';
import { PropertyKind } from 'src/types/enum/property-kind';
import { PropertyPurpose } from 'src/types/enum/property-purpose';

export class CreatePropertyDto {
  @ApiProperty({ example: 'Karachi', name: 'city' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'DHA Phase 6', name: 'area' })
  @IsString()
  @IsNotEmpty()
  area: string;

  @ApiProperty({ example: 'Pakistan', name: 'country' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: '1234', name: 'size' })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({ example: 'Modern Villa', name: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1000000, name: 'price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'https://placehold.co/400', name: 'sketch' })
  @IsString()
  @IsOptional()
  sketch: string;

  @ApiProperty({
    example: ['https://placehold.co/400', 'https://placehold.co/400'],
    name: 'images',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @ApiProperty({ example: 3, name: 'bedrooms' })
  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;

  @ApiProperty({ example: 2, name: 'bathrooms' })
  @IsNumber()
  @IsNotEmpty()
  bathrooms: number;

  @ApiProperty({ example: 'https://placehold.co/800', name: 'thumbnail' })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({
    enum: PropertyKind,
    example: PropertyKind.HOUSE,
    name: 'kind',
  })
  @IsEnum(PropertyKind)
  @IsNotEmpty()
  kind: PropertyKind;

  @ApiProperty({
    example: 'Beautiful modern villa with garden',
    name: 'description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: ['Mountain View', 'Valley View', 'Wifi'],
    name: 'amenities',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities: string[];

  @ApiProperty({
    enum: PropertyPurpose,
    example: PropertyPurpose.SALE,
    name: 'purpose',
  })
  @IsEnum(PropertyPurpose)
  @IsNotEmpty()
  purpose: PropertyPurpose;

  @ApiProperty({
    enum: PropertyCondition,
    example: PropertyCondition.NEW,
    name: 'condition',
  })
  @IsEnum(PropertyCondition)
  @IsNotEmpty()
  condition: PropertyCondition;
}
