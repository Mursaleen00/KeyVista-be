import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/schemas/register.schema';
import { UserResponse } from 'src/types/user-response';

export const updateResponse = ({
  user,
}: {
  user: UserDocument | null;
}): { updatedUser: UserResponse } => {
  if (!user) throw new NotFoundException('User not found');

  const { password: _, otp: __, ...res } = user.toObject();

  return { updatedUser: res as UserResponse };
};
