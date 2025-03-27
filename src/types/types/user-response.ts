import { UserDocument } from 'src/schemas/register.schema';

export type UserResponse = Omit<UserDocument, 'password' | 'otp'> &
  Record<string, any>;
