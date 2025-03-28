import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ required: true })
  agreeWithPT: boolean;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  isVerified: boolean;

  @Prop()
  otp: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
