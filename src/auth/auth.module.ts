import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './entity/register.entity';
import { EmailService } from './services/email.service';
import { JwtUserStrategy } from 'src/strategies/jwt-strategy';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, JwtUserStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
