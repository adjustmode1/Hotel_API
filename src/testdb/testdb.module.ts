import TestDBSchema, { TestDB } from './schema/testdb.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TestdbService } from './testdb.service';
import { TestdbController } from './testdb.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TestDB.name, schema: TestDBSchema }]),
  ],
  controllers: [TestdbController],
  providers: [TestdbService],
})
export class TestdbModule {}
