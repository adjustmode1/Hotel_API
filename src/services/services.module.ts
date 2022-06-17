import { JsonwebtokenModule } from './../jsonwebtoken/jsonwebtoken.module';
import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Services, ServicesSchema } from './schema/services.schema';
import { LogsSys, LogsSysSchema } from 'src/logs_sys/schema/logs_sys.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Services.name, schema: ServicesSchema },
    ]),
    JsonwebtokenModule,
    MongooseModule.forFeature([{ name: LogsSys.name, schema: LogsSysSchema }]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
