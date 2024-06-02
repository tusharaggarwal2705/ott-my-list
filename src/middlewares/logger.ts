// logger.middleware.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, params, query, body } = req;
    const userAgent = req.get('user-agent') || '';

    const logMessage = `[${method}] ${url} - Params: ${JSON.stringify(
      params,
    )}, Query: ${JSON.stringify(query)}, Body: ${JSON.stringify(
      body,
    )}, User-Agent: ${userAgent}`;
    this.logger.log(logMessage);

    next();
  }
}
