import { Module } from '@nestjs/common';
import { TestmicroService } from './testmicro.service';
import { TestmicroController } from './testmicro.controller';

@Module({
  controllers: [TestmicroController],
  providers: [TestmicroService],
})
export class TestmicroModule {}
