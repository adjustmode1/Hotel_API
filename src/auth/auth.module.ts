import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule.register({ secret: 'secretpassword' })],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
