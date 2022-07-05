import { LogsSys, LogsSysDocument } from './../logs_sys/schema/logs_sys.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTypeRoomMicroServiceDto } from './dto/create-type-room-micro-service.dto';
import { UpdateTypeRoomMicroServiceDto } from './dto/update-type-room-micro-service.dto';
import { TypeRoom, TypeRoomDocument } from './schema/type_room-schema';

@Injectable()
export class TypeRoomMicroServiceService {
  constructor(
    @InjectModel(TypeRoom.name) private typeRoomModel: Model<TypeRoomDocument>,
    @InjectModel(LogsSys.name) private logSysModel: Model<LogsSysDocument>,
  ) {}

  async create(
    person,
    CreateTypeRoomMicroServiceDto: CreateTypeRoomMicroServiceDto,
  ) {
    return this.typeRoomModel
      .create({
        name: CreateTypeRoomMicroServiceDto.name,
        price: CreateTypeRoomMicroServiceDto.price,
      })
      .then((res) => {
        this.logSysModel.insertMany({
          id_staff: person,
          action: 'insert',
          document: 'type room',
          data: res,
        });
        return {
          status: 200,
          data: res,
        };
      })
      .catch((err) => {
        return {
          status: 400,
          data: 11000,
        };
      });
  }

  findAll() {
    return this.typeRoomModel.find();
  }

  findOne(id: string) {
    return this.typeRoomModel.find({ _id: id });
  }

  async update(
    person,
    UpdateTypeRoomMicroServiceDto: UpdateTypeRoomMicroServiceDto,
  ) {
    const result = await this.typeRoomModel.updateOne(
      { _id: UpdateTypeRoomMicroServiceDto.id },
      {
        name: UpdateTypeRoomMicroServiceDto.name,
        price: UpdateTypeRoomMicroServiceDto.price,
      },
    );
    if (result.modifiedCount > 0) {
      this.logSysModel.insertMany({
        id_staff: person,
        action: 'update',
        document: 'type room',
        data: {
          _id: UpdateTypeRoomMicroServiceDto.id,
          name: UpdateTypeRoomMicroServiceDto.name,
          price: UpdateTypeRoomMicroServiceDto.price,
        },
      });
    }
    return result;
  }

  async remove(person, id: string) {
    const result = await this.typeRoomModel.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      this.logSysModel.insertMany({
        id_staff: person,
        action: 'delete',
        document: 'type room',
        data: { _id: id },
      });
    }
    return result;
  }
}
