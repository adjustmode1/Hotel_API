import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const result = jwt.verify(token, 'secretpassword') as {
          info: {
            info: {
              _id: string;
            };
            role: string;
          };
        };
        req.info = result.info;
        next();
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(400).send('token expired');
        } else {
          return res.status(400).send('bad request');
        }
      }
    } else {
      return res.status(400).send('unauthorization');
    }
  }
}
