import { StaffUpdateDto } from './dto/staff.update.dto';
import { StaffCreateDto } from './dto/staff.create.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff, StaffDocument } from './schema/staff.schema';

@Injectable()
export class StaffService {
    constructor(@InjectModel(Staff.name) private staffModel:Model<StaffDocument>){}

    findOne(id){
       return this.staffModel.findOne({gmail:id}).exec();
    }

    findByIdOne(id:string){
        return this.staffModel.findOne({_id: id}).exec();
    }
    findAll(){
        return this.staffModel.find().exec();
    }

    create(staff:StaffCreateDto,file){
        console.log('type file',typeof(file))
        return this.staffModel.insertMany({
            gmail:staff.gmail,
            password:staff.password,
            name:staff.name,
            birthday:staff.birthday,
            role:staff.role,
            first_date:staff.first_date,
            salary:staff.salary,
            avatar:file
        })
        .then(res=>{
            console.log('res',res)
            return {
                status:200,
                data:res
            };
        })
        .catch(err=>{
            console.log("err",err)
            if(err.code===11000)
            return {
                status:400,
                data:"duplicate"
            }
            else 
                return {
                    status:500,
                    data:err
                }
        })
    }

    removeOne(gmail:string){
        let result = this.staffModel.deleteOne({gmail});
        console.log(result)
        return result
    }

    update(id,info:StaffUpdateDto){
        return this.staffModel.updateOne({_id:id},{$set:
            {
                gmail:info.gmail,
                name:info.name,
                birthday:info.birthday,
                role:info.role,
                first_date:info.first_date,
                avatar:info.avatar,
                salary:info.salary
            }
        });
    }
}
