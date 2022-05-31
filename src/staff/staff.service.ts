import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff, StaffDocument } from './schema/staff.schema';

@Injectable()
export class StaffService {
    constructor(@InjectModel(Staff.name) private staffModel:Model<StaffDocument>){}

    login(id){
        console.log('service',id)
       return this.staffModel.findOne({id_staff:id}).exec();
    }
}
