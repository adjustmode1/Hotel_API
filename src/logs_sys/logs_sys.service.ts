import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateLogsSyDto } from './dto/create-logs_sy.dto';
import { UpdateLogsSyDto } from './dto/update-logs_sy.dto';
import { LogsSys, LogsSysDocument } from './schema/logs_sys.schema';
import { Model } from 'mongoose';

@Injectable()
export class LogsSysService {
  constructor(@InjectModel(LogsSys.name) private logsSysModel:Model<LogsSysDocument>){}
  create(createLogsSyDto: CreateLogsSyDto) {
    return "f"
  }

  findAll() {
    return this.logsSysModel.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} logsSy`;
  }

  update(id: string, updateLogsSyDto: UpdateLogsSyDto) {
    return `This action updates a #${id} logsSy`;
  }

  remove(id: string) {
    return `This action removes a #${id} logsSy`;
  }
}
