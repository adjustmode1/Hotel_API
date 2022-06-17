import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JsonwebtokenService } from './jsonwebtoken.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretpassword',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JsonwebtokenService],
  exports: [JsonwebtokenService],
})
export class JsonwebtokenModule {}
