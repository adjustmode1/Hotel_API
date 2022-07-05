import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { AuthGrpcGuard } from './../auth/authGrpc.guard';
import { TypeRoomMicroServiceService } from './type-room-micro-service.service';
import { Roles } from '../roles.decorator';

@Controller()
export class TypeRoomMicroServiceController {
  constructor(
    private readonly typeRoomMicroServiceService: TypeRoomMicroServiceService,
  ) {}

  @GrpcMethod('TypeRoomMicroService', 'findAll')
  async findAll() {
    const result = await this.typeRoomMicroServiceService.findAll();
    return {
      typeRooms: result,
    };
  }

  @GrpcMethod('TypeRoomMicroService', 'create')
  @UseGuards(AuthGrpcGuard)
  @Roles('admin')
  async create(data, meta: Metadata) {
    const info = meta['internalRepr'].get('info');
    const result = await this.typeRoomMicroServiceService.create(
      info['info']._id,
      data,
    );
    // if(result.status===400) throw new Error("dupllicate");
    return {
      typeRoom: result.data,
    };
  }

  @GrpcMethod('TypeRoomMicroService', 'hello')
  hello(data) {
    console.log(data);
    return {
      reply: 'hello',
    };
  }

  @GrpcMethod('TypeRoomMicroService', 'findOne')
  async findOne(data) {
    return {
      typeRoom: this.typeRoomMicroServiceService.findOne(data.id),
    };
  }

  @GrpcMethod('TypeRoomMicroService', 'update')
  @UseGuards(AuthGrpcGuard)
  @Roles('admin')
  async update(data, meta: Metadata) {
    const info = meta['internalRepr'].get('info');
    const result = await this.typeRoomMicroServiceService.update(
      info['info'].id,
      data,
    );
    return {
      data: result,
    };
  }

  @GrpcMethod('TypeRoomMicroService', 'remove')
  @UseGuards(AuthGrpcGuard)
  @Roles('admin')
  async remove(data, meta: Metadata) {
    const info = meta['internalRepr'].get('info');
    const result = await this.typeRoomMicroServiceService.remove(
      info['info'].id,
      data.id,
    );
    return {
      data: result,
    };
  }
}
