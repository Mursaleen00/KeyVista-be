import { UserDocument } from 'src/auth/entity/register.entity';

export type UserResponse = Omit<UserDocument, 'password' | 'otp'> &
  Record<string, any>;
