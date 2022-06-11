import { Injectable, NestMiddleware } from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(){}
  use(req: any, res: any, next: () => void) {
    if(!!req.headers.authorization){
      let token = req.headers.authorization.split(' ')[1];
      try {
        let result = jwt.verify(token,"secretpassword");
        req.roles = result.info.role;
        next()
      } catch (err) {
        if(err.name==='TokenExpiredError'){
          return res.status(400).send('token expired')
        }else{
          return res.status(400).send('bad request')
        }
      }
    }else{
      return res.status(400).send('unauthorization')
    }
  }
}
