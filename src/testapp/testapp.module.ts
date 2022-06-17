import { Module } from '@nestjs/common';
import { TestappService } from './testapp.service';
import { TestappController } from './testapp.controller';

@Module({
  controllers: [TestappController],
  providers: [TestappService],
})
export class TestappModule {}
