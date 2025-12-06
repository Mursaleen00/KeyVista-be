import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponse } from 'src/types/user-response';
import { updateResponse } from 'src/utils/update-response';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/schemas/register.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getMe(id: string): Promise<UserResponse> {
    try {
      const user = await this.userModel.findById(id);
      const { updatedUser } = updateResponse({ user });

      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: UserResponse }> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, {
        ...updateUserDto,
      });

      const { updatedUser } = updateResponse({ user });

      return {
        message: 'Profile updated successfully',
        user: updatedUser,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string; user: UserResponse }> {
    try {
      const user = await this.userModel.findById(id);

      const isMatch = await bcrypt?.compare(
        changePasswordDto.oldPassword,
        user?.password || '',
      );

      if (!isMatch) throw new BadRequestException('Old password is incorrect');

      if (changePasswordDto.password == changePasswordDto.oldPassword) {
        throw new BadRequestException(
          'New password cannot be the same as the old password',
        );
      }

      const hashedPassword = await bcrypt.hash(changePasswordDto.password, 10);

      await this.userModel.updateOne({ _id: id }, { password: hashedPassword });

      const { updatedUser } = updateResponse({ user });

      return {
        message: 'Password changed successfully',
        user: updatedUser,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  fineUserByEmail = async (email: string): Promise<UserDocument | null> => {
    return await this.userModel.findOne({ email });
  };
}
