import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

@Schema({ timestamps: true })
export class Chats extends BaseSchema {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: [Object] })
  chatHeads: {
    participantId: string;
    name: string;
    profilePicture: string;
    lastMessage: string;
    lastMessageTime: Date;
  }[];
}

export type ChatsDocument = HydratedDocument<Chats>;

export const ChatsSchema = SchemaFactory.createForClass(Chats);
