import { JsonwebtokenModule } from './../jsonwebtoken/jsonwebtoken.module';
import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
    imports:[JsonwebtokenModule],
    providers:[AuthGuard, AuthService],
    exports:[AuthGuard]
})
export class AuthModule {}
