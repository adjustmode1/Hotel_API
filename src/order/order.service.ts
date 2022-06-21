import { Order, OrderDocument } from './schema/order.shcema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel
      .insertMany({
        idUser: createOrderDto.idUser,
        totalPerson: createOrderDto.totalPerson,
        startDate: createOrderDto.startDate,
        endDate: createOrderDto.endDate,
        status: createOrderDto.status,
        services: createOrderDto.services,
        rooms: createOrderDto.rooms,
      })
      .then((res) => {
        return {
          status: 200,
          data: res,
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          status: 400,
          data: err,
        };
      });
  }

  findAll() {
    return this.orderModel
      .find()
      .populate([
        'idUser',
        { path: 'rooms', populate: { path: 'id_type_room' } },
        'services',
      ]);
  }

  findOne(id: string) {
    return this.orderModel
      .find({ _id: id })
      .populate([
        'idUser',
        { path: 'rooms', populate: { path: 'id_type_room' } },
        'services',
      ]);
  }

  listMyOrder(id: string) {
    return this.orderModel
      .find({ idUser: id })
      .populate([
        'idUser',
        { path: 'rooms', populate: { path: 'id_type_room' } },
        'services',
      ]);
  }

  sales() {
    return this.orderModel
      .find()
      .populate([
        'idUser',
        { path: 'rooms', populate: { path: 'id_type_room' } },
        'services',
      ]);
  }

  update(updateOrderDto: UpdateOrderDto) {
    return this.orderModel
      .updateOne(
        { _id: updateOrderDto.id },
        {
          $set: {
            idUser: updateOrderDto.idUser,
            totalPerson: updateOrderDto.totalPerson,
            startDate: updateOrderDto.startDate,
            endDate: updateOrderDto.endDate,
            status: updateOrderDto.status,
            services: updateOrderDto.services,
            rooms: updateOrderDto.rooms,
          },
        },
      )
      .then((res) => {
        console.log(res);
        return {
          status: 200,
          data: res,
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          status: 400,
          data: err,
        };
      });
  }

  remove(id: string) {
    return this.orderModel
      .deleteOne({ _id: id })
      .then((res) => {
        return {
          status: 200,
          data: res,
        };
      })
      .catch((err) => {
        return {
          status: 400,
          data: err,
        };
      });
  }
}
