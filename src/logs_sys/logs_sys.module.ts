import { Module } from '@nestjs/common';
import { LogsSysService } from './logs_sys.service';
import { LogsSysController } from './logs_sys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsSys, LogsSysSchema } from './schema/logs_sys.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:LogsSys.name,schema:LogsSysSchema}])],
  controllers: [LogsSysController],
  providers: [LogsSysService]
})
export class LogsSysModule {}
