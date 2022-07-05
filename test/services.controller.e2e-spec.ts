import { AppModule } from './../src/app.module';
import { ServicesController } from './../src/services/services.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
describe('ServicesController', () => {
  let controller: ServicesController;
  let app: INestApplication;
  let token;
  let id;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/login/admin')
      .send({
        id: 'admin',
        password: 'adminadmin',
      })
      .then((res) => {
        const result = JSON.parse(res.text);
        token = result.data;
      });

    controller = module.get<ServicesController>(ServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    it('find all services', async () => {
      const result = await request(app.getHttpServer())
        .get('/services/list')
        .expect(200);
      const arr = JSON.parse(result.text);
      expect(arr.length).toBeGreaterThan(0);
    });

    it('find one services', async () => {
      const result = await request(app.getHttpServer())
        .get('/services/629ef3c351ecaa94d9c5bf65')
        .expect(200);
      const arr = JSON.parse(result.text);
      expect(arr.length).toBe(1);
    });

    it('find one services not have', async () => {
      const result = await request(app.getHttpServer())
        .get('/services/629ef3c351ecaa94d9c32f65')
        .expect(200);
      const arr = JSON.parse(result.text);
      expect(arr.length).toBe(0);
    });
  });

  describe('create serice', () => {
    it('create new service', () => {
      return request(app.getHttpServer())
        .post('/services/create')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          name: 'name service temp ',
          price: 123123,
        })
        .expect(201)
        .then((res) => {
          const result = JSON.parse(res.text);
          id = result.data[0]._id;
        });
    });

    it('create new service with no name', () => {
      return request(app.getHttpServer())
        .post('/services/create')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          price: 123123,
        })
        .expect(400);
    });

    it('create new service with no price', () => {
      return request(app.getHttpServer())
        .post('/services/create')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          name: 'name temp',
        })
        .expect(400);
    });

    it('create new service with no data', () => {
      return request(app.getHttpServer())
        .post('/services/create')
        .auth(token, {
          type: 'bearer',
        })
        .send({})
        .expect(400);
    });
  });

  describe('update', () => {
    it('update service', () => {
      return request(app.getHttpServer())
        .patch('/services/update')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          _id: id,
          name: 'new name service temp ',
        })
        .expect(200);
    });

    it('update service not have token', async () => {
      const result = await request(app.getHttpServer())
        .patch('/services/update')
        .send({
          _id: id,
          name: 'new name service temp ',
        });
      expect(result.text).toBe('unauthorization');
    });
  });

  describe('delete', () => {
    it('delete service', () => {
      return request(app.getHttpServer())
        .delete(`/services/${id}`)
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
    });

    it('delete service not found', () => {
      return request(app.getHttpServer())
        .delete(`/services/2a956f2a3c48bdd5c091bc44`)
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
    });

    it('delete service not have token', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/services/${id}`)
        .expect(400);
      expect(result.text).toBe('unauthorization');
    });
  });
});
