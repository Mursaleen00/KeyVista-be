import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserDocument } from './entity/register.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<UserDocument> {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
  ): Promise<UserDocument & { token: string }> {
    return this.authService.login(body);
  }
}
