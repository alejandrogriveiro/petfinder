import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const logger = new Logger(CustomJwtAuthGuard.name);

    if (err || !user) {
      const message = `Error: ${context.getHandler().name} ${
        context.getClass().name
      } ${info.message}`;
      logger.error(message);
      throw err || new UnauthorizedException('Token not found or invalid');
    }
    return user;
  }
}
