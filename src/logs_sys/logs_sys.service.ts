import { Injectable } from '@nestjs/common';
import { CreateLogsSyDto } from './dto/create-logs_sy.dto';
import { UpdateLogsSyDto } from './dto/update-logs_sy.dto';

@Injectable()
export class LogsSysService {
  create(createLogsSyDto: CreateLogsSyDto) {
    return 'This action adds a new logsSy';
  }

  findAll() {
    return `This action returns all logsSys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logsSy`;
  }

  update(id: number, updateLogsSyDto: UpdateLogsSyDto) {
    return `This action updates a #${id} logsSy`;
  }

  remove(id: number) {
    return `This action removes a #${id} logsSy`;
  }
}
