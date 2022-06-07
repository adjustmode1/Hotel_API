import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './schema/room.schema.ts';

@Module({
  imports:[MongooseModule.forFeature([{name:Room.name,schema:RoomSchema}])],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
