import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Reviews {
  @Prop({ required: true })
  propertyId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export type ReviewsDocument = HydratedDocument<Reviews>;

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);
