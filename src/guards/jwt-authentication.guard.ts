import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const token = request.headers.authorization.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token does not exist');
      }

      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      request.user = decoded;
      request['loggedInUserId'] = decoded.id;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'You are not authenticated, login please',
      );
    }
  }
}
