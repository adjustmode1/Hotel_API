import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { TestmicroService } from './testmicro.service';
import { CreateTestmicroDto } from './dto/create-testmicro.dto';
import { UpdateTestmicroDto } from './dto/update-testmicro.dto';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class TestmicroController {
  constructor(private readonly testmicroService: TestmicroService) {}

  @GrpcMethod('TestmicroService','helloFunction')
  helloFucntion(data,metadata:Metadata) {
    console.log('services call')
    console.log('data: ',data)
    console.log('meta: ',metadata)
    return {reply:10}
    // return this.testmicroService.create(createTestmicroDto);
  }

  @MessagePattern('createTestmicro')
  create(@Payload() createTestmicroDto: CreateTestmicroDto) {
    return this.testmicroService.create(createTestmicroDto);
  }

  @MessagePattern('findAllTestmicro')
  findAll() {
    return this.testmicroService.findAll();
  }

  // @MessagePattern('findOneTestmicro')
  @GrpcMethod('TesmicroController','findOne')
  findOne(@Payload() id: number) {
    return this.testmicroService.findOne(id);
  }

  @MessagePattern('updateTestmicro')
  update(@Payload() updateTestmicroDto: UpdateTestmicroDto) {
    return this.testmicroService.update(updateTestmicroDto.id, updateTestmicroDto);
  }

  @MessagePattern('removeTestmicro')
  remove(@Payload() id: number) {
    return this.testmicroService.remove(id);
  }
}
