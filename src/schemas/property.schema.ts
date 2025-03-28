import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PropertyCondition } from 'src/enum/property-condition';
import { PropertyKind } from 'src/enum/property-kind';
import { PropertyPurpose } from 'src/enum/property-purpose';
import { Position } from 'src/types/location';
import { BaseSchema } from './base.schema';

@Schema({ timestamps: true })
export class Property extends BaseSchema {
  // Location
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  completeLocation: string;

  @Prop({ required: true, type: Object })
  position: Position;

  // Property Details
  @Prop({
    enum: PropertyPurpose,
    required: true,
  })
  purpose: PropertyPurpose;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  bedrooms: number;

  @Prop({ required: true })
  bathrooms: number;

  @Prop({ required: true })
  amenities: string[];

  @Prop({ required: true })
  price: number;

  @Prop({
    enum: PropertyKind,
    required: true,
  })
  kind: PropertyKind;

  @Prop({
    enum: PropertyCondition,
    required: true,
  })
  condition: PropertyCondition;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  // Images
  @Prop({ required: true })
  thumbnail: string;

  @Prop()
  sketch: string;

  @Prop()
  images: string[];

  // Owner
  @Prop({ required: true })
  ownerId: string;
}

export type PropertyDocument = HydratedDocument<Property>;

export const PropertySchema = SchemaFactory.createForClass(Property);
