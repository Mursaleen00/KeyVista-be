import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PropertyKind } from 'src/enum/property-kind';
import { PropertyPurpose } from 'src/enum/property-purpose';

export class FilterDto {
  @ApiProperty({ name: 'city', required: false })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ name: 'location', required: false })
  @IsString()
  @IsOptional()
  area: string;

  @ApiProperty({ name: 'type', enum: PropertyKind, required: false })
  @IsString()
  @IsEnum(PropertyKind)
  @IsOptional()
  kind: string;

  @ApiProperty({ name: 'purpose', enum: PropertyPurpose, required: false })
  @IsString()
  @IsEnum(PropertyPurpose)
  @IsOptional()
  purpose: string;

  @ApiProperty({ name: 'beds', required: false })
  @IsString()
  @IsOptional()
  beds: string;

  @ApiProperty({ name: 'priceFrom', required: false })
  @IsString()
  @IsOptional()
  priceFrom: string;

  @ApiProperty({ name: 'priceTo', required: false })
  @IsString()
  @IsOptional()
  priceTo: string;

  @ApiProperty({ name: 'areaFrom', required: false })
  @IsString()
  @IsOptional()
  sizeFrom: string;

  @ApiProperty({ name: 'areaTo', required: false })
  @IsString()
  @IsOptional()
  sizeTo: string;

  @ApiProperty({ name: 'page', required: false, default: 1 })
  @IsString()
  @IsOptional()
  page?: string;

  @ApiProperty({ name: 'limit', required: false, default: 10 })
  @IsString()
  @IsOptional()
  limit?: string;
}
