import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserResponse } from 'src/types/types/user-response';
import { AuthService } from './auth.service';
import { EmailDto } from './dto/email.dto';
import { LoginDto } from './dto/login.dto';
import { OTPDto } from './dto/otp.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ============================ Register ============================
  @ApiOperation({ summary: 'Register The User' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<UserResponse> {
    return this.authService.register(body);
  }

  // ============================ Login ============================
  @ApiOperation({ summary: 'Login The User' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(
    @Body() body: LoginDto,
  ): Promise<{ user: UserResponse; token: string }> {
    return this.authService.login(body);
  }

  // ============================ Verify OTP ============================
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({ type: OTPDto })
  @Post('verify-otp')
  async verifyOtp(
    @Body() body: OTPDto,
  ): Promise<{ user: UserResponse; token: string }> {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  // ============================ Resend OTP ============================
  @ApiOperation({ summary: 'Resend OTP' })
  @ApiBody({ type: EmailDto })
  @Post('resend-otp')
  async resendOtp(@Body() body: EmailDto): Promise<{ message: string }> {
    return this.authService.resendOtp(body.email);
  }

  // ============================ Forgot Password ============================
  @ApiOperation({ summary: 'Forgot Password' })
  @ApiBody({ type: EmailDto })
  @Post('forgot-password')
  async forgotPassword(@Body() body: EmailDto): Promise<{ message: string }> {
    return this.authService.forgotPassword(body.email);
  }

  // ============================ Reset Password ============================
  @ApiOperation({ summary: 'Reset Password' })
  @ApiBody({ type: ResetPasswordDto })
  @Post('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(body);
  }
}
