import { join } from 'path';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { TypeRoomApiService } from './type-room-api.service';
import { TypeRoomApiController } from './type-room-api.controller';
console.log(__dirname)
@Module({
  imports:[
    ClientsModule.register([{
      name:"typeRoomInject",
      transport: Transport.GRPC,
      options:{
        url:"0.0.0.0:3601",
        package:"TypeRoom",
        protoPath:join(__dirname,"../../src/type-room-api/type-room-api.proto")
        // protoPath:join("/src/type-room-api/type-room-api.proto")
      }
    }])
  ],
  controllers: [TypeRoomApiController],
  providers: [TypeRoomApiService]
})
export class TypeRoomApiModule {}
