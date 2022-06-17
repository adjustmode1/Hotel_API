import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './schema/room.schema.ts';
import { LogsSys, LogsSysSchema } from 'src/logs_sys/schema/logs_sys.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: LogsSys.name, schema: LogsSysSchema }]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
