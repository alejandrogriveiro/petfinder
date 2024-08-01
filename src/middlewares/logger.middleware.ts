import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger('Response');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const reqTime = new Date().getTime();

    res.on('finish', () => {
      const resTime = new Date().getTime();
      const responseTime = resTime - reqTime;

      const { statusCode } = res;
      if (statusCode >= 400) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} - ${responseTime}ms`.toUpperCase(),
        );
      } else {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} - ${responseTime}ms`.toUpperCase(),
        );
      }
    });

    next();
  }
}
