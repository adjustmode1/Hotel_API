import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test, TestSchema } from './schema/test.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Test.name,schema:TestSchema}])],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
