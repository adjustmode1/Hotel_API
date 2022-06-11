import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector:Reflector,
    ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string[]>('roles',context.getHandler()) 
    const req = context.switchToHttp().getRequest();
    console.log('req',req.roles)
    if(!!req.roles){
      return role.indexOf(req.roles)!==-1;
    }else{
      return false;
    }
  }
}
