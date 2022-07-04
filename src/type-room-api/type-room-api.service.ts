import { Injectable } from '@nestjs/common';
import { CreateTypeRoomApiDto } from './dto/create-type-room-api.dto';
import { UpdateTypeRoomApiDto } from './dto/update-type-room-api.dto';

@Injectable()
export class TypeRoomApiService {
  create(createTypeRoomApiDto: CreateTypeRoomApiDto) {
    return 'This action adds a new typeRoomApi';
  }

  findAll() {
    return `This action returns all typeRoomApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeRoomApi`;
  }

  update(id: number, updateTypeRoomApiDto: UpdateTypeRoomApiDto) {
    return `This action updates a #${id} typeRoomApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeRoomApi`;
  }
}
