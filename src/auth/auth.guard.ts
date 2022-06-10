import { JwtService } from '@nestjs/jwt';
import { JsonwebtokenService } from './../jsonwebtoken/jsonwebtoken.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector:Reflector,
    // private jwt:JsonwebtokenService
    ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string[]>('roles',context.getHandler())
    let token;
    if(!!context.switchToHttp().getRequest().headers.authorization){
      token = context.switchToHttp().getRequest().headers.authorization.split(' ')[1];
      console.log('token',token)
      let jwt_service = new JwtService();
      let jwt = new JsonwebtokenService(jwt_service);
      console.log(
        jwt.check("fawef")
      )
      // let result = this.jwt.sign(token)
      // console.log('result',result)
    }else{
      console.log('koo')
    }
    // console.log('role1',context.switchToHttp().getRequest().)
    return false;
  }
}
