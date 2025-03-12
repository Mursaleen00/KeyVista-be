import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

// Define the shape of your decoded JWT payload
interface JwtPayload {
  id: string; // Adjust this based on your actual JWT payload structure
  [key: string]: any; // Add other properties if needed
}

// Extend the Request type to include custom properties
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  loggedInUserId?: string;
}

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
      const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

      const authHeader: string | undefined = request.headers[
        'authorization'
      ] as string | undefined;

      if (!authHeader) {
        throw new UnauthorizedException('Authorization header is missing');
      }

      const token: string = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token does not exist');
      }

      const decoded: JwtPayload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request.user = decoded;
      request.loggedInUserId = decoded.id;

      return true;
    } catch (error) {
      console.log('🚀 ~ AuthenticationGuard ~ canActivate ~ error:', error);
      throw new UnauthorizedException(
        'You are not authenticated, please log in',
      );
    }
  }
}
