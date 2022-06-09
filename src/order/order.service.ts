import { Order, OrderDocument } from './schema/order.shcema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel:Model<OrderDocument>){}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return this.orderModel.find().populate('');
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
