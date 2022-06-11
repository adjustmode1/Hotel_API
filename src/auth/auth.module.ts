import { JwtModule } from '@nestjs/jwt';
import { JsonwebtokenModule } from './../jsonwebtoken/jsonwebtoken.module';
import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
    imports:[JwtModule.register({secret:"secretpassword"})],
    providers:[AuthGuard],
    exports:[AuthGuard]
})
export class AuthModule {}
