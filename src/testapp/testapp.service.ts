import { Injectable } from '@nestjs/common';
import { CreateTestappDto } from './dto/create-testapp.dto';
import { UpdateTestappDto } from './dto/update-testapp.dto';

@Injectable()
export class TestappService {
  create(createTestappDto: CreateTestappDto) {
    return 'This action adds a new testapp';
  }

  findAll() {
    return `This action returns all testapp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testapp`;
  }

  update(id: number, updateTestappDto: UpdateTestappDto) {
    return `This action updates a #${id} testapp`;
  }

  remove(id: number) {
    return `This action removes a #${id} testapp`;
  }
}
