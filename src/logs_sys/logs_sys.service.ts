import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { LogsSys, LogsSysDocument } from './schema/logs_sys.schema';
import { Model } from 'mongoose';

@Injectable()
export class LogsSysService {
  constructor(@InjectModel(LogsSys.name) private logsSysModel:Model<LogsSysDocument>){}

  findAll() {
    return this.logsSysModel.find();
  }

  findOne(id: string) {
    return this.logsSysModel.find({_id:id});
  }

  remove(id: string) {
    return `This action removes a #${id} logsSy`;
  }
}
