import { HashModule } from './../hash/hash.module';
import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './schema/staff.schema';
import { LogsSys, LogsSysSchema } from 'src/logs_sys/schema/logs_sys.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Staff.name,schema:StaffSchema}]),HashModule,MongooseModule.forFeature([{name:LogsSys.name,schema:LogsSysSchema}])],
  controllers: [StaffController],
  providers: [StaffService],
  exports:[StaffService]
})
export class StaffModule {}
