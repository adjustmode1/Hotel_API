import { StaffModule } from './../staff/staff.module';
import { JsonwebtokenModule } from './../jsonwebtoken/jsonwebtoken.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [UserModule, StaffModule, HashModule, JsonwebtokenModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
