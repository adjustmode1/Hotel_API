import { Injectable } from '@nestjs/common';
import { CreateTestmicroDto } from './dto/create-testmicro.dto';
import { UpdateTestmicroDto } from './dto/update-testmicro.dto';

@Injectable()
export class TestmicroService {
  create(createTestmicroDto: CreateTestmicroDto) {
    console.log('đã gọi 1');
    return 'This action adds a new testmicro' + createTestmicroDto;
  }

  findAll() {
    return `This action returns all testmicro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testmicro`;
  }

  update(id: number, updateTestmicroDto: UpdateTestmicroDto) {
    return `This action updates a #${id} testmicro ${updateTestmicroDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} testmicro`;
  }
}
