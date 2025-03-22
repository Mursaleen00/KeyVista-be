// NestJS Common Imports
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

// NestJS Config Service Import
import { ConfigService } from '@nestjs/config';

// NestJS Passport Imports
import { PassportStrategy } from '@nestjs/passport';

// Passport JWT Imports
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from 'src/api/auth/entity/register.entity';
import { UserService } from 'src/api/user/user.service';
import { JWT } from 'src/types/types/jwt.type';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt_user') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(jwt: JWT): Promise<UserDocument | null> {
    try {
      let user: UserDocument | null = null;

      if (jwt.email) {
        user = await this.userService.fineUserByEmail(jwt.email);

        if (!user || !user.id) {
          Logger.error('Invalid token');
          throw new UnauthorizedException('Invalid token');
        }

        return user;
      }
      return null;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        Logger.error('Token expired');
        throw new UnauthorizedException('Token expired');
      } else {
        console.log(error);
        throw error.message;
      }
    }
  }
}
