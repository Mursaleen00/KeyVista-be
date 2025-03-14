import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/entity/register.entity';
import { UserResponse } from 'src/types/types/user-response';
import { updateResponse } from 'src/utils/update-response';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getMe(id: string): Promise<UserResponse> {
    const user = await this.userModel.findById(id);
    const { updatedUser } = updateResponse({ user });

    return updatedUser;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: UserResponse }> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDto,
    });

    const { updatedUser } = updateResponse({ user });

    return {
      message: 'Profile updated successfully',
      user: updatedUser,
    };
  }

  fineUserByEmail = async (email: string): Promise<UserDocument | null> => {
    return await this.userModel.findOne({ email });
  };
}
