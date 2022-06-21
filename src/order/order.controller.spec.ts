import { AppModule } from './../app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import * as request from 'supertest';

describe('OrderController', () => {
  let controller: OrderController;
  let app: INestApplication;
  let token_user;
  let id;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/login/user')
      .send({
        gmail: 'adjustmode1@gmail.com',
        password: 'adminadmin',
      })
      .then((res) => {
        const result = JSON.parse(res.text);
        token_user = result.data;
      });

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all order', () => {
    return request(app.getHttpServer())
      .get('/order/list')
      .auth(token_user, {
        type: 'bearer',
      })
      .expect(200);
  });

  it('find one order', () => {
    return request(app.getHttpServer())
      .get('/order/62a18d1ddf0effb1b90193d0')
      .auth(token_user, {
        type: 'bearer',
      })
      .expect(200);
  });

  it('create order', () => {
    return request(app.getHttpServer())
      .post('/order/create')
      .auth(token_user, {
        type: 'bearer',
      })
      .send({
        idUser: '62a955f4763250074914bd01',
        totalPerson: 10,
        startDate: '2022-02-22',
        endDate: '2022-02-26',
        status: 1,
        rooms: ['62a95ae67595a539e1fd3a06'],
      })
      .then((res) => {
        const result = JSON.parse(res.text);
        id = result.data[0]._id;
      });
  });

  it('update order', () => {
    return request(app.getHttpServer())
      .post('/order/create')
      .auth(token_user, {
        type: 'bearer',
      })
      .send({
        id,
        idUser: '62a955f4763250074914bd01',
        totalPerson: 10,
        startDate: '2022-02-22',
        endDate: '2022-02-29',
        status: 1,
        rooms: ['62a95ae67595a539e1fd3a06'],
      })
      .then((res) => {
        const result = JSON.parse(res.text);
        id = result.data[0]._id;
      });
  });

  it('delete order', () => {
    return request(app.getHttpServer())
      .delete(`/order/${id}`)
      .auth(token_user, {
        type: 'bearer',
      });
  });
});
