import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, OnModuleInit } from '@nestjs/common';
import { TypeRoomApiService } from './type-room-api.service';
import { CreateTypeRoomApiDto } from './dto/create-type-room-api.dto';
import { UpdateTypeRoomApiDto } from './dto/update-type-room-api.dto';
import { ClientGrpc } from '@nestjs/microservices';

interface createRequest{
  name:string;
  price:number;
}

interface typeRoom{
  _id:string;
  name:string;
  price:number;
}

interface helloRequest{
  data:string;
}

interface ServiceGRPC{
  findAll({data:string});
  hello({data:string});
}

@Controller('type-room-api')
// export class TypesRoomApiController implements OnModuleInit{
export class TypeRoomApiController {
  constructor(@Inject("typeRoomInject") private readonly client:ClientGrpc){}

  private service: ServiceGRPC;

  onModuleInit() {
    this.service = this.client.getService<ServiceGRPC>("TypeRoomMicroService")
  }

  @Get()
  findAll() {
    return this.service.findAll({data:"ok"})
  }

  @Get('hello')
  hello(){
    return this.service.hello({data:1})
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.typeRoomApiService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTypeRoomApiDto: UpdateTypeRoomApiDto) {
  //   return this.typeRoomApiService.update(+id, updateTypeRoomApiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.typeRoomApiService.remove(+id);
  // }
}
