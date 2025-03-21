import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/api/auth/entity/register.entity';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop([{ type: Types.ObjectId, ref: User, required: true }])
  participants: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
