import { HashModule } from './../hash/hash.module';
import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './schema/staff.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Staff.name,schema:StaffSchema}]),HashModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports:[StaffService]
})
export class StaffModule {}
