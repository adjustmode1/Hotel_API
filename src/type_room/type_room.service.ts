import { LogsSys, LogsSysDocument } from './../logs_sys/schema/logs_sys.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTypeRoomDto } from './dto/create-type_room.dto';
import { UpdateTypeRoomDto } from './dto/update-type_room.dto';
import { TypeRoom, TypeRoomDocument } from './schema/type_room-schema';

@Injectable()
export class TypeRoomService {

  constructor(
    @InjectModel(TypeRoom.name) private typeRoomModel:Model<TypeRoomDocument>, 
    @InjectModel(LogsSys.name) private logSysModel:Model<LogsSysDocument>
  ){}

  async create(person,createTypeRoomDto: CreateTypeRoomDto) {
    return this.typeRoomModel.create({
      name:createTypeRoomDto.name,
      price:createTypeRoomDto.price
    }).then(res=>{
      this.logSysModel.insertMany({id_staff:person,action:'insert',document:"type room",data:res})
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

  async update(person,updateTypeRoomDto: UpdateTypeRoomDto) {
    let result = await this.typeRoomModel.updateOne({_id:updateTypeRoomDto.id},{
      name:updateTypeRoomDto.name,
      price:updateTypeRoomDto.price
    });
    if(result.modifiedCount>0){
      this.logSysModel.insertMany({id_staff:person,action:'update',document:"type room",data:{_id:updateTypeRoomDto.id,name:updateTypeRoomDto.name,price:updateTypeRoomDto.price}})
    }
    return result;
  }


  async remove(person,id: string) {
    let result = await this.typeRoomModel.deleteOne({_id:id});
    if(result.deletedCount>0){
      this.logSysModel.insertMany({id_staff:person,action:'delete',document:"type room",data:{_id:id}})
    }
    return result
  }
}
