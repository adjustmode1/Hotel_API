import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTypeRoomDto } from './dto/create-type_room.dto';
import { UpdateTypeRoomDto } from './dto/update-type_room.dto';
import { TypeRoom, TypeRoomDocument } from './schema/type_room-schema';

@Injectable()
export class TypeRoomService {
  constructor(@InjectModel(TypeRoom.name) private typeRoomModel:Model<TypeRoomDocument>){}
  async create(createTypeRoomDto: CreateTypeRoomDto) {
    return this.typeRoomModel.create({
      createTypeRoomDto
    });
  }

  findAll() {
    return `This action returns all typeRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeRoom`;
  }

  update(id: number, updateTypeRoomDto: UpdateTypeRoomDto) {
    return `This action updates a #${id} typeRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeRoom`;
  }
}
