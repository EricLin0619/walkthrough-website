import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('middle ware');
    console.log(req.headers.authorization);
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    }
    if (authorization === 'Eric') {
      next();
    } else {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}
