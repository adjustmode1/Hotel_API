import { Metadata } from '@grpc/grpc-js';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGrpcGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string[]>('roles', context.getHandler());
    const metadata = context.switchToRpc().getContext();
    const authorization = metadata['internalRepr'].get("authorization")[0]
    if (authorization) {
        const token = authorization.split(' ')[1];
        try {
          const result = jwt.verify(token, 'secretpassword') as {
            info: {
              info: {
                _id: string;
              };
              role: string;
            };
          };
          metadata['internalRepr'].set("info",result.info)
          return true;
        } catch (err) {
          console.log(err)
             return false;
        }
      } else {
        return false;
      }
    }
}