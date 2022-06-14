import { LogsSys, LogsSysDocument } from './../logs_sys/schema/logs_sys.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './schema/room.schema.ts';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  @InjectModel(LogsSys.name) private logSysModel:Model<LogsSysDocument>
  ){}
  create(person,createRoomDto: CreateRoomDto) {
    console.log('service',createRoomDto)
    return this.roomModel.insertMany({
      _id:createRoomDto._id,
      name:createRoomDto.name,
      id_type_room:createRoomDto.idTypeRoom,
      status:createRoomDto.status,
      image:createRoomDto.image
    }).then(res=>{
      this.logSysModel.insertMany({id_staff:person,action:'insert',document:"room",data:res})
      return {
        status:200,
        data:res
      }
    })
    .catch(err=>{
      console.log('err',err)
      return {
        status:400,
        data:err
      }
    })
  }

  findAll() {
    return this.roomModel.find().populate('id_type_room').exec()
    // return this.roomModel.find().exec();
  }

  findOne(id: string) {
    return this.roomModel.find({_id:id}).populate('id_type_room').exec().then(res=>{
      return {
        status:200,
        data:res
      }
    })
    .catch(err=>{
      return {
        status:500,
        data:err
      }
    })
  }

  //chưa xong
  update(person,updateRoomDto: UpdateRoomDto) {
    return this.roomModel.updateOne({_id:updateRoomDto._id},{$set:{
      id_type_room:updateRoomDto.idTypeRoom,
      status:updateRoomDto.status,
      image:updateRoomDto.image
    }}).then(res=>{
      this.logSysModel.insertMany({id_staff:person,action:'update',document:"room",data:res})
      return {
        status:200,
        data:res
      }
    })
    .catch(err=>{
      return{
        status:400,
        data:err
      }
    })
  }

  remove(person,id: string) {
    return this.roomModel.deleteOne({_id:id}).then(res=>{
      this.logSysModel.insertMany({id_staff:person,action:'delete',document:"room",data:res})
      return {
        status:200,
        data:res
      }
    })
    .catch(err=>{
      return {
        status:400,
        data:err
      }
    })
  }
}
