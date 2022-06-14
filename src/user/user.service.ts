import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { LogsSys, LogsSysDocument } from 'src/logs_sys/schema/logs_sys.schema';

@Injectable()
export class UserService {

  constructor(  
    @InjectModel(User.name) private userModel:Model<UserDocument>,
    @InjectModel(LogsSys.name) private logSysModel:Model<LogsSysDocument>

  ){}

  create(createUserDto: CreateUserDto) {
    return this.userModel.insertMany({
      gmail:createUserDto.gmail,
      name:createUserDto.name,
      gender:createUserDto.gender,
      birthday:createUserDto.birthday,
      password:createUserDto.password,
      phone:createUserDto.phone,
      avatar:createUserDto.avatar
    });
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({_id:id}).exec();
  }

  update(updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({_id:updateUserDto._id},{$set:{
        gmail:updateUserDto.gmail,
        name:updateUserDto.name,
        gender:updateUserDto.gender,
        birthday:updateUserDto.birthday,
        phone:updateUserDto.phone,
        avatar:updateUserDto.avatar
    }})
  }

  async remove(person,id: string) {
    let result = await this.userModel.deleteOne({_id:id});
    if(result.deletedCount>0){
      if(result.deletedCount>0){
        this.logSysModel.insertMany({id_staff:person,action:'delete',document:"user",data:{_id:id}})
      }
    }
    return result
  }

  loginUser(gmail){
    return this.userModel.findOne({gmail}).exec()
    .then(res=>{
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
