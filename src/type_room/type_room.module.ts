import { join } from 'path';
import { LogsSys, LogsSysSchema } from './../logs_sys/schema/logs_sys.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TypeRoomService } from './type_room.service';
import { TypeRoomController } from './type_room.controller';
import TypeRoomSchema, { TypeRoom } from './schema/type_room-schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.register([{
    //   name:"TypeRoomGRPC",
    //   transport:Transport.GRPC,
    //   options:{
    //     package:'TypeRoom',
    //     protoPath:join(__dirname,"../src/type-room-micro-service/type-room-micro-service.proto")
    //   }
    // }]),
    MongooseModule.forFeature([
      { name: TypeRoom.name, schema: TypeRoomSchema },
    ]),
    MongooseModule.forFeature([{ name: LogsSys.name, schema: LogsSysSchema }]),
  ],
  controllers: [TypeRoomController],
  providers: [TypeRoomService],
})
export class TypeRoomModule {}
