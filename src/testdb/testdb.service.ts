import { TestDB, TestDBDocument } from './schema/testdb.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTestdbDto } from './dto/create-testdb.dto';
import { UpdateTestdbDto } from './dto/update-testdb.dto';
import { Model } from 'mongoose';

@Injectable()
export class TestdbService {

  constructor(@InjectModel(TestDB.name) private testDBModel:Model<TestDBDocument>){}

  create(createTestdbDto: CreateTestdbDto) {
    return this.testDBModel.insertMany(createTestdbDto)
  }

  findAll() {
    return this.testDBModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} testdb`;
  }

  update(id: number, updateTestdbDto: UpdateTestdbDto) {
    console.log(updateTestdbDto)
    return `This action updates a #${id} testdb`;
  }

  remove(id: number) {
    return `This action removes a #${id} testdb`;
  }
}
