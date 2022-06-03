import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}

  create(createUserDto: CreateUserDto) {
    return this.userModel.insertMany({
      _id:createUserDto.gmail,
      name:createUserDto.name,
      gender:createUserDto.gender,
      birthday:createUserDto.birthday,
      password:createUserDto.password,
      phone:createUserDto.phone,
      avatar:""
    });
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.find({
      _id:id
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id:id});
  }
}
