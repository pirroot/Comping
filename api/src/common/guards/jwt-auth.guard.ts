import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any | unknown, user: any | unknown, info: any | unknown) {
    console.log(typeof err, user, info);
    if (err || !user) {
      throw new UnauthorizedException('شما لاگین نیستید');
    }
    return user;
  }
}
