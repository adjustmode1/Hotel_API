import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TypeRoomService } from './type_room.service';
import { TypeRoomController } from './type_room.controller';
import { TypeRoom, TypeRoomSchema } from './schema/type_room-schema';

@Module({
  imports:[MongooseModule.forFeature([{name:TypeRoom.name,schema:TypeRoomSchema}])],
  controllers: [TypeRoomController],
  providers: [TypeRoomService]
})
export class TypeRoomModule {}
