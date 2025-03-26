import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Chats {
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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export type ChatsDocument = HydratedDocument<Chats>;

export const ChatsSchema = SchemaFactory.createForClass(Chats);
