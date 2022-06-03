import { StaffCreateDto } from './dto/staff.create.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff, StaffDocument } from './schema/staff.schema';

@Injectable()
export class StaffService {
    constructor(@InjectModel(Staff.name) private staffModel:Model<StaffDocument>){}

    findOne(id){
       return this.staffModel.findOne({id_staff:id}).exec();
    }

    create(staff:StaffCreateDto){
        return this.staffModel.insertMany({
            _id:staff.id,
            password:staff.password,
            name:staff.name,
            birthday:staff.birthday,
            role:staff.role,
            first_date:staff.first_date,
            salary:staff.salary,
            avatar:""
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
            return {
                status:400,
                data:"duplicate"
            }
        })
    }


    // chưa xong
    async uploadAvatar(id,file){
        console.log("file",file)
        this.staffModel.insertMany({
            _id:"b12345",
            password:"$2b$10$yOFUobd5YJnRUhti3DExzeqa2vEVoOEIPfEfK8ryeIZrjMEXGIwdK",
            name:"a",
            birthday:"02/20/2000",
            role:1,
            first_date:"2/22/2000",
            salary:222,
            avatar:{
            data:file.buffer,
            type:file.mimetype,
            name:file.originalname,
        }}).then(res=>{
            console.log('res',res)
        })
        .catch(err=>{
            console.log("err",err);
        })
        // this.staffModel.updateOne({_id:id},{avatar:{
        //     data:file.buffer,
        //     type:file.mimetype,
        //     name:file.originalname,
        // }}).then(res=>{
        //     console.log('res',res)
        // })
        // .catch(err=>{
        //     console.log("err",err);
        // })
        return "ok"
    }

    removeOne(id:string){
        return this.staffModel.deleteOne({
            _id:id
        })
    }
}
