import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { StaffModule } from './staff/staff.module';
import { UserModule } from './user/user.module';
import { TypeRoomModule } from './type_room/type_room.module';
import { RoomModule } from './room/room.module';
import { ServicesModule } from './services/services.module';
import { LogsSysModule } from './logs_sys/logs_sys.module';
import { HashModule } from './hash/hash.module';
import { OrderModule } from './order/order.module';
import { JsonwebtokenModule } from './jsonwebtoken/jsonwebtoken.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { TestdbModule } from './testdb/testdb.module';
import { TestappModule } from './testapp/testapp.module';

@Module({
  imports: [DatabaseModule, StaffModule, UserModule, TypeRoomModule, RoomModule, ServicesModule, LogsSysModule, HashModule, OrderModule, JsonwebtokenModule, LoginModule, AuthModule, TestdbModule, TestappModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        // {path:'order/(.*)',method:RequestMethod.GET},
        {path:'room/(.*)',method:RequestMethod.GET},
        {path:'typeRoom/(.*)',method:RequestMethod.GET},
        {path:'services/(.*)',method:RequestMethod.GET},
      )
      .forRoutes('services','staff','order','room','typeRoom')
  }
}
