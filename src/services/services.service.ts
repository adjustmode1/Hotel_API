import { LogsSys, LogsSysDocument } from './../logs_sys/schema/logs_sys.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Services, ServicesDocument } from './schema/services.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services.name) private servicesModel:Model<ServicesDocument>,
    @InjectModel(LogsSys.name) private logSysModel:Model<LogsSysDocument>
  ){}

  create(person,createServiceDto: CreateServiceDto) {
    return this.servicesModel.insertMany({
      name:createServiceDto.name,
      price:createServiceDto.price
    }).then(res=>{
      this.logSysModel.insertMany({id_staff:person,action:'insert',document:"services",data:res})
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
    return this.servicesModel.find();
  }

  findOne(id: string) {
    return this.servicesModel.find({_id:id});
  }

  update(person,updateServiceDto: UpdateServiceDto) {
    return this.servicesModel.updateOne({_id:updateServiceDto._id},{
      name:updateServiceDto.name,
      price:updateServiceDto.price
    }).then(res=>{
      this.logSysModel.insertMany({id_staff:person,action:'update',document:"services",data:updateServiceDto})
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

  async remove(person,id: string) {
    const result = await this.servicesModel.deleteOne({_id:id});
    if(result.deletedCount>0){
      this.logSysModel.insertMany({id_staff:person,action:'delete',document:"services",data:{id}})
    }
    return result;
  }
}
