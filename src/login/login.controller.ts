import { JsonwebtokenService } from './../jsonwebtoken/jsonwebtoken.service';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';
import { HashService } from 'src/hash/hash.service';

@Controller('login')
export class LoginController {
  constructor(
    private userService:UserService,
    private hash:HashService,
    private jwt:JsonwebtokenService
  ) {}

  @Post('user')
  @UsePipes(new ValidationPipe({transform:true}))
  async loginUser(@Body() info:LoginDto){
    let result = await this.userService.loginUser(info.gmail)
    if(result.status===200){
      let hashing = await this.hash.compare(info.password,result.data.password);
      if(hashing){
        return {
          status:200,
          data:this.jwt.sign(result.data)
        }
      }else{
        return {
          status:200,
          data:"login failse"
        }
      }
    }
    return {
      status:400,
      data:"not found"
    }
  }

}
