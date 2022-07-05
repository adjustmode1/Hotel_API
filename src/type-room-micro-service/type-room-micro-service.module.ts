import { LogsSys, LogsSysSchema } from './../logs_sys/schema/logs_sys.schema';
import { Module } from '@nestjs/common';
import { TypeRoomMicroServiceService } from './type-room-micro-service.service';
import { TypeRoomMicroServiceController } from './type-room-micro-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import TypeRoomSchema, { TypeRoom } from './schema/type_room-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TypeRoom.name, schema: TypeRoomSchema },
    ]),
    MongooseModule.forFeature([{ name: LogsSys.name, schema: LogsSysSchema }]),
  ],
  controllers: [TypeRoomMicroServiceController],
  providers: [TypeRoomMicroServiceService],
})
export class TypeRoomMicroServiceModule {}
