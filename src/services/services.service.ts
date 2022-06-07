import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Services, ServicesDocument } from './schema/services.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Services.name) private servicesModel:Model<ServicesDocument>){}

  create(createServiceDto: CreateServiceDto) {
    return this.servicesModel.insertMany({
      name:createServiceDto.name,
      price:createServiceDto.price
    });
  }

  findAll() {
    return this.servicesModel.find();
  }

  findOne(id: string) {
    return this.servicesModel.find({_id:id});
  }

  update(updateServiceDto: UpdateServiceDto) {
    return this.servicesModel.updateOne({_id:updateServiceDto._id},{
      name:updateServiceDto.name,
      price:updateServiceDto.price
    });
  }

  remove(id: string) {
    return this.servicesModel.deleteOne({_id:id});
  }
}
