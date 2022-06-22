import { AppModule } from './../src/app.module';
import { OrderController } from './../src/order/order.controller';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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

  describe('find',()=>{
    it('find all order', async () => {
      const result = await request(app.getHttpServer())
        .get('/order/list')
        .auth(token_user, {
          type: 'bearer',
        })
        .expect(200);
        const arr = JSON.parse(result.text);
        expect(arr.length).toBeGreaterThan(0)
    });
  
    it('find all order not have token', async () => {
      const result = await request(app.getHttpServer())
        .get('/order/list')
        .expect(400)
      
        expect(result.text).toBe('unauthorization')
    });
  
    it('find one order', async () => {
      const result = await request(app.getHttpServer())
        .get('/order/62a18d1ddf0effb1b90193d0')
        .auth(token_user, {
          type: 'bearer',
        })
        .expect(200);
        const arr = JSON.parse(result.text);
        expect(arr.length).toBe(1)
    });
  
    it('find one order not have token', async () => {
      const result = await request(app.getHttpServer())
        .get('/order/62a18d1ddf0effb1b90193d0')
        .expect(400);
        
        expect(result.text).toBe('unauthorization')
    });
  
    it('find one order not found', async () => {
      const result = await request(app.getHttpServer())
        .get('/order/62a18d1ddf0effb1b90123d0')
        .auth(token_user, {
          type: 'bearer',
        })
        .expect(200);
  
        const arr = JSON.parse(result.text);
        expect(arr.length).toBe(0)
    });
  })

  describe('create',()=>{
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
  
    it('create order not have token', async () => {
      const result = await request(app.getHttpServer())
        .post('/order/create')
        .send({
          idUser: '62a955f4763250074914bd01',
          totalPerson: 10,
          startDate: '2022-02-22',
          endDate: '2022-02-26',
          status: 1,
          rooms: ['62a95ae67595a539e1fd3a06'],
        })
        expect(result.text).toBe('unauthorization')
    });
  
    it('create order with loss params', async () => {
      const result = await request(app.getHttpServer())
        .post('/order/create')
        .auth(token_user, {
          type: 'bearer',
        })
        .send({
          idUser: '62a955f4763250074914bd01',
          startDate: '2022-02-22',
          endDate: '2022-02-26',
          status: 1,
          rooms: ['62a95ae67595a539e1fd3a06'],
        })
        const res = JSON.parse(result.text);
        expect(res.error).toBe('Bad Request')
    });
  })

  describe('update',()=>{
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
  
    it('update order not have token', async () => {
      const result = await request(app.getHttpServer())
        .post('/order/create')
        .send({
          id,
          idUser: '62a955f4763250074914bd01',
          totalPerson: 10,
          startDate: '2022-02-22',
          endDate: '2022-02-29',
          status: 1,
          rooms: ['62a95ae67595a539e1fd3a06'],
        })
        expect(result.text).toBe('unauthorization')
    });
  
    it('update order with loss param', async () => {
      const result = await request(app.getHttpServer())
        .post('/order/create')
        .auth(token_user, {
          type: 'bearer',
        })
        .send({
          id,
          totalPerson: 10,
          startDate: '2022-02-22',
          endDate: '2022-02-29',
          status: 1,
          rooms: ['62a95ae67595a539e1fd3a06'],
        })
        const res = JSON.parse(result.text);
        expect(res.error).toBe('Bad Request')
    });
  })

  describe('delete',()=>{
    it('delete order', () => {
      return request(app.getHttpServer())
        .delete(`/order/${id}`)
        .auth(token_user, {
          type: 'bearer',
        });
    });
  
    it('delete order not have token', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/order/${id}`)
        expect(result.text).toBe('unauthorization')
    });
  
    it('delete order not order', () => {
      return request(app.getHttpServer())
        .delete(`/order/62a95ae67595a539e1fd3a06`)
        .auth(token_user, {
          type: 'bearer',
        });
    });
  })
});
