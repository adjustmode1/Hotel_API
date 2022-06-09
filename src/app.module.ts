import { Module } from '@nestjs/common';
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

@Module({
  imports: [DatabaseModule, StaffModule, TestModule, UserModule, TypeRoomModule, RoomModule, ServicesModule, LogsSysModule, HashModule, FileModule, AuthenModule, AuthorModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
