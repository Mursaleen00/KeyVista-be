import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

import generateOtp from 'src/utils/otp-generator';

import { User, UserDocument } from 'src/schemas/register.schema';
import { UserResponse } from 'src/types/types/user-response';
import { updateResponse } from 'src/utils/update-response';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from './services/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly emailService: EmailService,
  ) {}

  // ============================ Register ============================
  async register({
    email,
    password,
    ...res
  }: RegisterDto): Promise<UserResponse> {
    try {
      const already: UserDocument | null = await this.userModel.findOne({
        res,
      });

      if (already) throw new ConflictException('User already exists');

      const otp = generateOtp();

      const hashedPassword: string = await bcrypt?.hash(password, 10);

      const newUser: UserDocument = await this.userModel.create({
        ...res,
        isVerified: false,
        password: hashedPassword,
        otp,
      });

      await this.emailService.sendOtpEmail(email, otp);

      const { updatedUser } = updateResponse({ user: newUser });
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ============================ Login ============================
  async login({
    email,
    password,
  }: LoginDto): Promise<{ user: UserResponse; token: string }> {
    try {
      const user: UserDocument | null = await this.userModel.findOne({ email });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');

      const jwtSecret: string = process.env.JWT_SECRET ?? '';

      const token: string = jwt.sign(
        { email: user.email, name: user.fullName, id: user._id },
        jwtSecret,
        { expiresIn: '1h' },
      );

      const { updatedUser } = updateResponse({ user });

      return {
        user: updatedUser,
        token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ============================ Verify OTP ============================
  async verifyOtp(
    email: string,
    otp: string,
  ): Promise<{ user: UserResponse; token: string }> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) throw new UnauthorizedException('Invalid credentials');
      if (user?.otp !== otp) throw new BadRequestException('Incorrect OTP');

      if (!user?.isVerified) {
        await this.userModel.updateOne(
          { email },
          { isVerified: true, otp: '' },
        );
      } else await this.userModel.updateOne({ email }, { otp: '' });

      const jwtSecret: string = process.env.JWT_SECRET ?? '';

      const token: string = jwt.sign(
        { email: user.email, name: user.fullName, id: user._id },
        jwtSecret,
        { expiresIn: '1h' },
      );

      const { updatedUser } = updateResponse({ user });

      return { user: updatedUser, token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ============================ Resend OTP ============================
  async resendOtp(email: string): Promise<{ message: string }> {
    try {
      await this.sendOtp(email);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ============================ Forgot Password ============================
  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const user: UserDocument | null = await this.userModel.findOne({ email });
      if (!user) throw new NotFoundException('User not found');

      const otp = generateOtp();
      await this.userModel.findByIdAndUpdate({ otp });

      await this.emailService.sendOtpEmail(email, otp);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ============================ Reset Password ============================
  async resetPassword({
    email,
    password,
  }: ResetPasswordDto): Promise<{ message: string }> {
    try {
      const user: UserDocument | null = await this.userModel.findOne({ email });
      if (!user) throw new UnauthorizedException('User not found');

      const storedOtp = user?.otp;
      if (!storedOtp)
        throw new BadRequestException('Please verify your email first');

      const hashedPassword: string = await bcrypt?.hash(password, 10);

      await this.userModel.updateOne(
        { email },
        { password: hashedPassword, otp: null },
      );

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //  ============================ Send OTP ============================
  private async sendOtp(email: string): Promise<void> {
    try {
      const user: UserDocument | null = await this.userModel.findOne({ email });
      if (!user) throw new NotFoundException('User not found');

      const otp = generateOtp();
      await this.userModel.updateOne({ email }, { otp });
      await this.emailService.sendOtpEmail(email, otp);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
