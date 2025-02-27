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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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

    const hashedPassword: string = await bcrypt?.hash(password, 10);

    const newUser: UserDocument = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const { password: _, ...userResponse } = newUser.toObject();
    return userResponse;
  }

  async login({
    email,
    password,
  }: LoginInterface): Promise<{ user: Partial<UserDocument>; token: string }> {
    if (!email || !password)
      throw new BadRequestException('Email and password are required');

    const user: UserDocument | null = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const jwtSecret: string | undefined = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET is not defined');

    const token: string = jwt.sign(
      { email: user.email, name: user.name, id: user._id },
      jwtSecret,
      { expiresIn: '1h' },
    );

    const { password: _, ...userResponse } = user.toObject();
    return {
      user: userResponse,
      token,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
