import { Module } from '@nestjs/common';
import { LogsSysService } from './logs_sys.service';
import { LogsSysController } from './logs_sys.controller';

@Module({
  controllers: [LogsSysController],
  providers: [LogsSysService]
})
export class LogsSysModule {}
