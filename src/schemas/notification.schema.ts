import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

@Schema({ timestamps: true })
export class Notification extends BaseSchema {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: false })
  isRead: boolean;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, type: Object })
  sender: {
    name: string;
    profilePicture: string;
    id: string;
  };
}

export type NotificationDocument = HydratedDocument<Notification>;

export const NotificationSchema = SchemaFactory.createForClass(Notification);
