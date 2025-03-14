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

import isValidEmail from 'src/utils/email-validation';
import generateOtp from 'src/utils/otp-generator';

import { UserResponse } from 'src/types/types/user-response';
import { updateResponse } from 'src/utils/update-response';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User, UserDocument } from './entity/register.entity';
import { LoginInterface } from './interface/login.interface';
import { RegisterInterface } from './interface/register.interface';
import { EmailService } from './services/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly emailService: EmailService,
  ) {}

  // ============================ Register ============================
  async register({
    city,
    email,
    country,
    fullName,
    password,
    agreeWithPT,
    phoneNumber,
    profilePicture,
  }: RegisterInterface): Promise<UserResponse> {
    const already: UserDocument | null = await this.userModel.findOne({
      email,
    });

    if (
      !email ||
      !fullName ||
      !password ||
      !country ||
      !city ||
      !phoneNumber ||
      !agreeWithPT
    )
      throw new BadRequestException('All fields are required');

    isValidEmail(email);

    if (password.length < 6)
      throw new BadRequestException('Password must be at least 6 characters');

    if (already) throw new ConflictException('User already exists');

    const otp = generateOtp();

    const hashedPassword: string = await bcrypt?.hash(password, 10);

    const newUser: UserDocument = await this.userModel.create({
      city,
      email,
      country,
      fullName,
      phoneNumber,
      agreeWithPT,
      profilePicture,
      isVerified: false,
      password: hashedPassword,
      otp,
    });

    await this.emailService.sendOtpEmail(email, otp);

    const { updatedUser } = updateResponse({ user: newUser });
    return updatedUser;
  }

  // ============================ Login ============================
  async login({
    email,
    password,
  }: LoginInterface): Promise<{ user: UserResponse; token: string }> {
    if (!email || !password)
      throw new BadRequestException('Email and password are required');

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
  }

  // ============================ Verify OTP ============================
  async verifyOtp(
    email: string,
    otp: string,
  ): Promise<{ user: UserResponse; token: string }> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user?.otp !== otp) throw new BadRequestException('Incorrect OTP');

    if (!user?.isVerified) {
      await this.userModel.updateOne({ email }, { isVerified: true, otp: '' });
    } else await this.userModel.updateOne({ email }, { otp: '' });

    const jwtSecret: string = process.env.JWT_SECRET ?? '';

    const token: string = jwt.sign(
      { email: user.email, name: user.fullName, id: user._id },
      jwtSecret,
      { expiresIn: '1h' },
    );

    const { updatedUser } = updateResponse({ user });

    return { user: updatedUser, token };
  }

  // ============================ Resend OTP ============================
  async resendOtp(email: string): Promise<{ message: string }> {
    await this.sendOtp(email);
    return { message: 'OTP sent successfully' };
  }

  // ============================ Forgot Password ============================
  async forgotPassword(email: string): Promise<{ message: string }> {
    isValidEmail(email);

    const user: UserDocument | null = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    const otp = generateOtp();
    await this.userModel.findByIdAndUpdate({ otp });

    await this.emailService.sendOtpEmail(email, otp);
    return { message: 'OTP sent successfully' };
  }

  // ============================ Reset Password ============================
  async resetPassword({
    email,
    password,
  }: ResetPasswordDto): Promise<{ message: string }> {
    isValidEmail(email);

    const user: UserDocument | null = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('User not found');

    const storedOtp = user?.otp;
    if (!storedOtp)
      throw new BadRequestException('Please verify your email first');

    if (!password || password.length < 6)
      throw new BadRequestException('Password must be at least 6 characters');

    const hashedPassword: string = await bcrypt?.hash(password, 10);

    await this.userModel.updateOne(
      { email },
      { password: hashedPassword, otp: null },
    );

    return { message: 'Password reset successfully' };
  }

  //  ============================ Send OTP ============================
  private async sendOtp(email: string): Promise<void> {
    isValidEmail(email);

    const user: UserDocument | null = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    const otp = generateOtp();
    await this.userModel.updateOne({ email }, { otp });
    await this.emailService.sendOtpEmail(email, otp);
  }
}
