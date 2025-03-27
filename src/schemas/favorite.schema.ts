import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

@Schema({ timestamps: true })
export class Favorite extends BaseSchema {
  @Prop({ required: true })
  propertyIds: string[];

  @Prop({ required: true })
  userId: string;
}

export type FavoriteDocument = HydratedDocument<Favorite>;

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
