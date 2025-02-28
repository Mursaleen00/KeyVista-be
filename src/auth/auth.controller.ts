import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OTPDto } from './dto/otp.dto';
import { RegisterDto } from './dto/register.dto';
import { ResendOTPDto } from './dto/resend-otp.dtp';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserDocument } from './entity/register.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ============================ Register ============================
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<Partial<UserDocument>> {
    return this.authService.register(body);
  }

  // ============================ Login ============================
  @Post('login')
  async login(
    @Body() body: LoginDto,
  ): Promise<{ user: Partial<UserDocument>; token: string }> {
    return this.authService.login(body);
  }

  // ============================ Verify OTP ============================
  @Post('verify-otp')
  async verifyOtp(
    @Body() body: OTPDto,
  ): Promise<{ user: Partial<UserDocument>; token: string }> {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  // ============================ Resend OTP ============================
  @Post('resend-otp')
  async resendOtp(@Body() body: ResendOTPDto): Promise<{ message: string }> {
    return this.authService.resendOtp(body.email);
  }

  // ============================ Forgot Password ============================
  @Post('forgot-password')
  async forgotPassword(
    @Body() body: ResendOTPDto,
  ): Promise<{ message: string }> {
    return this.authService.forgotPassword(body.email);
  }

  // ============================ Reset Password ============================
  @Post('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(body);
  }
}
