import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User, UserDocument } from './entity/register.entity';
import { LoginInterface } from './interface/login.interface';
import { RegisterInterface } from './interface/register.interface';
import { EmailService } from './services/email.service';

@Injectable()
export class AuthService {
  private otps: Map<string, { otp: string; expires: number }> = new Map();
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly emailService: EmailService,
  ) {}

  async register({
    email,
    name,
    password,
  }: RegisterInterface): Promise<Partial<UserDocument>> {
    const already: UserDocument | null = await this.userModel.findOne({
      email,
    });

    if (!email || !name || !password)
      throw new BadRequestException('Email, name, and password are required');

    if (!this.isValidEmail(email))
      throw new BadRequestException('Invalid email format');

    if (password.length < 6)
      throw new BadRequestException('Password must be at least 6 characters');

    if (already) throw new ConflictException('User already exists');

    const otp = this.generateOtp();
    const expires = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes
    this.otps.set(email, { otp, expires });

    const hashedPassword: string = await bcrypt?.hash(password, 10);

    const newUser: UserDocument = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    await this.emailService.sendOtpEmail(email, otp);

    const { password: _, ...userResponse } = newUser.toObject();
    return userResponse;
  }

  async login({
    email,
    password,
  }: LoginInterface): Promise<{ user: Partial<UserDocument> }> {
    if (!email || !password)
      throw new BadRequestException('Email and password are required');

    const user: UserDocument | null = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...userResponse } = user.toObject();
    return {
      user: userResponse,
    };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Optional: Method to verify OTP
  async verifyOtp(
    email: string,
    otp: string,
  ): Promise<{ user: Partial<UserDocument>; token: string }> {
    const storedOtp = this.otps.get(email);

    if (!storedOtp || storedOtp.expires < Date.now())
      throw new BadRequestException('OTP has expired or is invalid');

    if (storedOtp.otp !== otp) throw new BadRequestException('Incorrect OTP');

    await this.userModel.updateOne({ email }, { isVerified: true });

    const user: UserDocument | null = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const jwtSecret: string = process.env.JWT_SECRET ?? '';

    const token: string = jwt.sign(
      { email: user.email, name: user.name, id: user._id },
      jwtSecret,
      { expiresIn: '1h' },
    );

    this.otps.delete(email);

    const { password: _, ...userResponse } = user.toObject();

    return {
      user: userResponse,
      token,
    };
  }
}
