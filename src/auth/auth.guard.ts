import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    if (req.info.role) {
      console.log('req', req.info.role);
      return role.indexOf(req.info.role) !== -1;
    } else {
      return false;
    }
  }
}
