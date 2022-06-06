import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Services, ServicesSchema } from './schema/services.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Services.name,schema:ServicesSchema}])],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
