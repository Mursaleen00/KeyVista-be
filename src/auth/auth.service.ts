import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './entity/register.entity';
import { LoginInterface } from './interface/login.interface';
import { RegisterInterface } from './interface/register.interface';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async register({
    email,
    name,
    password,
  }: RegisterInterface): Promise<UserDocument> {
    const already = await this.userModel.findOne({ email });

    if (already) throw new UnauthorizedException('User already exists');

    const bcryptPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      name,
      email,
      password: bcryptPassword,
      createdAt: new Date(),
      isVerified: false,
    });

    return newUser;
  }

  async login({
    email,
    password,
  }: LoginInterface): Promise<UserDocument & { token: string }> {
    const user = await this.userModel.findOne({ email });
    const isMatch = await bcrypt.compare(password, user?.password ?? '');

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = jwt.sign(
      { email: user?.email, name: user?.name },
      process.env.JWT_SECRET,
      {},
    );

    return {
      ...user?.toObject(),
      token,
    } as UserDocument & { token: string };
  }
}
