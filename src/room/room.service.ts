import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './schema/room.schema.ts';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>){}
  create(createRoomDto: CreateRoomDto) {
    return this.roomModel.insertMany({
      name:createRoomDto.name,
      id_type_room:createRoomDto.idTypeRoom,
      status:createRoomDto.status,
      image:createRoomDto.image
    }).then(res=>{
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

  findAll() {
    return this.roomModel.find().exec();
  }

  findOne(id: string) {
    return this.roomModel.find({_id:id}).exec();
  }

  //chưa xong
  update(updateRoomDto: UpdateRoomDto) {
    // return this.roomModel.updateOne({_id:updateRoomDto._id},{$set:{

    // }})
    return "updated";
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
