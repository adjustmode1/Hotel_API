import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { StaffModule } from './staff/staff.module';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { TypeRoomModule } from './type_room/type_room.module';
import { RoomModule } from './room/room.module';
import { ServicesModule } from './services/services.module';
import { LogsSysModule } from './logs_sys/logs_sys.module';
import { HashModule } from './hash/hash.module';
import { FileModule } from './file/file.module';
import { AuthenModule } from './authen/authen.module';
import { AuthorModule } from './author/author.module';
import { OrderModule } from './order/order.module';
import { JsonwebtokenModule } from './jsonwebtoken/jsonwebtoken.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [DatabaseModule, StaffModule, TestModule, UserModule, TypeRoomModule, RoomModule, ServicesModule, LogsSysModule, HashModule, FileModule, AuthenModule, AuthorModule, OrderModule, JsonwebtokenModule, LoginModule, AuthModule],
  // JwtModule.register({secret:"secretPassword"})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('services');
  }
}
