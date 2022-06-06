import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test, TestDocument } from './schema/test.schema';
import { Model } from 'mongoose';

@Injectable()
export class TestService {

  constructor(@InjectModel(Test.name) private testModel:Model<TestDocument>){}

  create(createTestDto: CreateTestDto) {
    return this.testModel.insertMany(createTestDto);
  }

  findAll() {
    return `This action returns all test`;
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
