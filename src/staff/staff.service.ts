import { LogsSys, LogsSysDocument } from './../logs_sys/schema/logs_sys.schema';
import { StaffUpdateDto } from './dto/staff.update.dto';
import { StaffCreateDto } from './dto/staff.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff, StaffDocument } from './schema/staff.schema';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
    @InjectModel(LogsSys.name) private logSysModel: Model<LogsSysDocument>,
  ) {}

  findOne(id) {
    return this.staffModel.findOne({ _id: id }).exec();
  }

  findByIdOne(id: string) {
    return this.staffModel.findOne({ _id: id }).exec();
  }
  findAll() {
    return this.staffModel.find().exec();
  }

  create(person, staff: StaffCreateDto, file) {
    return this.staffModel
      .insertMany({
        id: staff.id,
        password: staff.password,
        name: staff.name,
        birthday: staff.birthday,
        role: staff.role,
        first_date: staff.first_date,
        salary: staff.salary,
        avatar: file,
      })
      .then((res) => {
        this.logSysModel.insertMany({
          id_staff: person,
          action: 'insert',
          document: 'staff',
          data: res,
        });
        return {
          status: 200,
          data: res,
        };
      })
      .catch((err) => {
        console.log('err', err);
        if (err.code === 11000)
          return {
            status: 400,
            data: 'duplicate',
          };
        else
          return {
            status: 500,
            data: err,
          };
      });
  }

  async removeOne(person, id: string) {
    const result = await this.staffModel.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      this.logSysModel.insertMany({
        id_staff: person,
        action: 'delete',
        document: 'staff',
        data: id,
      });
    }
    return result;
  }

  update(person, id, info: StaffUpdateDto) {
    return this.staffModel
      .updateOne(
        { _id: id },
        {
          $set: {
            id: info.id,
            name: info.name,
            birthday: info.birthday,
            role: info.role,
            first_date: info.first_date,
            avatar: info.avatar,
            salary: info.salary,
          },
        },
      )
      .then((res) => {
        this.logSysModel.insertMany({
          id_staff: person,
          action: 'update',
          document: 'staff',
          data: info,
        });
        return {
          status: 200,
          data: res,
        };
      })
      .catch((err) => {
        return {
          status: 400,
          data: err,
        };
      });
  }

  loginAdmin(id) {
    return this.staffModel
      .findOne({ id })
      .exec()
      .then((res) => {
        return {
          status: 200,
          data: res,
        };
      })
      .catch((err) => {
        return {
          status: 400,
          data: err,
        };
      });
  }
}
