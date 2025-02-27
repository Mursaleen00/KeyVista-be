import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OTPDto } from './dto/otp.dto';
import { RegisterDto } from './dto/register.dto';
import { UserDocument } from './entity/register.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<Partial<UserDocument>> {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
  ): Promise<{ user: Partial<UserDocument> }> {
    return this.authService.login(body);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() body: OTPDto,
  ): Promise<{ user: Partial<UserDocument>; token: string }> {
    return this.authService.verifyOtp(body.email, body.otp);
  }
}
