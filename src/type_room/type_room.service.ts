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
      name:createTypeRoomDto.name,
      price:createTypeRoomDto.price
    }).then(res=>{
      return {
        status:200,
        data:res
      };
    })
    .catch(err=>{
      console.log(err)
      return {
        status:400,
        data:11000
      };
    })
  }

  findAll() {
    return this.typeRoomModel.find();
  } 

  findOne(id: string) {
    return this.typeRoomModel.find({_id:id});
  }

  update(updateTypeRoomDto: UpdateTypeRoomDto) {
    return this.typeRoomModel.updateOne({_id:updateTypeRoomDto.id},{
      name:updateTypeRoomDto.name,
      price:updateTypeRoomDto.price
    });
  }


  remove(id: string) {
    return this.typeRoomModel.deleteOne({_id:id});
  }
}
