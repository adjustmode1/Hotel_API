import { Module } from '@nestjs/common';
import { TestmicroService } from './testmicro.service';
import { TestmicroController } from './testmicro.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [TestmicroController],
  providers: [TestmicroService]
})
export class TestmicroModule {}
