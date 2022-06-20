import { JsonwebtokenService } from './../jsonwebtoken/jsonwebtoken.service';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import { StaffService } from '../staff/staff.service';
import { AdminLoginDto } from './dto/admin.login.dto';

@Controller('login')
export class LoginController {
  constructor(
    private userService: UserService,
    private adminService: StaffService,
    private hash: HashService,
    private jwt: JsonwebtokenService,
  ) {}

  @Post('user')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(@Body() info: LoginDto) {
    const result = await this.userService.loginUser(info.gmail);
    if (result.status === 200 && result.data !== null) {
      const hashing = await this.hash.compare(
        info.password,
        result.data.password,
      );
      if (hashing) {
        return {
          status: 200,
          data: this.jwt.sign({ info: result.data, role: 'user' }),
        };
      } else {
        return {
          status: 200,
          data: 'login failse',
        };
      }
    }
    return {
      status: 400,
      data: 'not found',
    };
  }

  @Post('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginAdmin(@Body() info: AdminLoginDto) {
    const result = await this.adminService.loginAdmin(info.id);
    if (result.data !== null && result.status === 200) {
      const hashing = await this.hash.compare(
        info.password,
        result.data.password,
      );
      if (hashing) {
        return {
          status: 200,
          data: this.jwt.sign({ info: result.data, role: 'admin' }),
        };
      } else {
        return {
          status: 200,
          data: 'login failse',
        };
      }
    }
    return {
      status: 400,
      data: 'not found',
    };
  }
}
