import { LogsSys, LogsSysSchema } from './../logs_sys/schema/logs_sys.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TypeRoomService } from './type_room.service';
import { TypeRoomController } from './type_room.controller';
import TypeRoomSchema, { TypeRoom } from './schema/type_room-schema';

@Module({
  imports:[MongooseModule.forFeature([{name:TypeRoom.name,schema:TypeRoomSchema}]),MongooseModule.forFeature([{name:LogsSys.name,schema:LogsSysSchema}])],
  controllers: [TypeRoomController],
  providers: [TypeRoomService]
})
export class TypeRoomModule {}
