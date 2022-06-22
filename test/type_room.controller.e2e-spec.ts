import { AppModule } from './../src/app.module';
import { TypeRoomController } from './../src/type_room/type_room.controller';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
describe('TypeRoomController', () => {
  let controller: TypeRoomController;
  let app: INestApplication;
  let id: string;
  let token: string;

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

    controller = module.get<TypeRoomController>(TypeRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all type room', () => {
    return request(app.getHttpServer()).get('/typeRoom/list').expect(200);
  });

  it('find One type Room', () => {
    return request(app.getHttpServer())
      .get('/typeRoom/62a956f2a3c48bdd5c091bc4')
      .expect(200);
  });

  describe('create', () => {
    it('create new type room', () => {
      return request(app.getHttpServer())
        .post('/typeRoom/create')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          name: 'test temp type',
          price: 123123,
        })
        .expect(201)
        .then((res) => {
          const result = JSON.parse(res.text);
          id = result.data._id;
        });
    });

    it('create new type room not have token', async () => {
      const result = await request(app.getHttpServer())
        .post('/typeRoom/create')
        .send({
          name: 'test temp type',
          price: 123123,
        })
        .expect(400)

        expect(result.text).toBe('unauthorization')
    });

    it('create new type room not price', () => {
      return request(app.getHttpServer())
        .post('/typeRoom/create')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          name: 'test temp type',
        })
        .expect(400);
    });

    it('create new type room not name', () => {
      return request(app.getHttpServer())
        .post('/typeRoom/create')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          price: 242343,
        })
        .expect(400);
    });
    it('create new type room not name and price', () => {
      return request(app.getHttpServer())
        .post('/typeRoom/create')
        .auth(token, {
          type: 'bearer',
        })
        .send({})
        .expect(400);
    });
  });

  describe('update',()=>{
    it('update type room', () => {
      return request(app.getHttpServer())
        .patch('/typeRoom/update')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          id,
          name: 'new name temp type',
          price: 131313,
        })
        .expect(200);
    });

    it('update type room with loss param', async () => {
      const result = await request(app.getHttpServer())
        .patch('/typeRoom/update')
        .auth(token, {
          type: 'bearer',
        })
        .send({
          price: 131313,
        })
        .expect(400);
    });

    it('update type room not have token',async () => {
      const result = await request(app.getHttpServer())
        .patch('/typeRoom/update')
        .send({
          id,
          name: 'new name temp type',
          price: 131313,
        })
        .expect(400);
            
      expect(result.text).toBe('unauthorization')
    });
  })

  describe('delete',()=>{
    it('delete type room', () => {
      return request(app.getHttpServer())
        .delete(`/typeRoom/${id}`)
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
    });

    it('delete type room not have token', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/typeRoom/${id}`)
        .expect(400);

      expect(result.text).toBe('unauthorization')
    });
  })
});
