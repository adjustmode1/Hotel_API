import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';

@Module({
  providers: [AuthenService]
})
export class AuthenModule {}
