import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PropertyCondition } from 'src/types/enum/property-condition';
import { PropertyKind } from 'src/types/enum/property-kind';
import { PropertyPurpose } from 'src/types/enum/property-purpose';
import { Position } from 'src/types/types/location';

@Schema({ timestamps: true })
export class Property {
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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export type PropertyDocument = HydratedDocument<Property>;

export const PropertySchema = SchemaFactory.createForClass(Property);
