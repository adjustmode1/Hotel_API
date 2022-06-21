import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
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

  it('find all services', () => {
    return request(app.getHttpServer()).get('/services/list').expect(200);
  });

  it('find one services', () => {
    return request(app.getHttpServer())
      .get('/services/629ef3c351ecaa94d9c5bf65')
      .expect(200);
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

  it('delete service', () => {
    return request(app.getHttpServer())
      .delete(`/services/${id}`)
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
  });
});
