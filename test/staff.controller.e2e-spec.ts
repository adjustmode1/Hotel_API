import { AppModule } from './../src/app.module';
import { StaffController } from './../src/staff/staff.controller';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as FormData from 'form-data';
import * as fs from 'fs';
describe('StaffController', () => {
  let controller: StaffController;
  let app: INestApplication;
  let id;
  let token;
  let data: FormData;
  let boundary;
  beforeAll(async () => {
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

    data = new FormData();
    data.append('id', 'b112233test');
    data.append('password', 'adminadmin');
    data.append('name', 'name temp');
    data.append('birthday', '2000-02-22');
    data.append('role', 1);
    data.append('first_date', '2020-02-20');
    data.append('salary', 2000000);
    const file = fs.readFileSync('src/testUpload/z22.jpg');
    data.append('avatar', file, 'z22.jpg');

    boundary = data.getBoundary();

    controller = module.get<StaffController>(StaffController);
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

        return expect(result.text).toBe('unauthorization')
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

    it('update type room with loss param',() => {
      return request(app.getHttpServer())
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
            
      return expect(result.text).toBe('unauthorization')
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

      return expect(result.text).toBe('unauthorization')
    });
  })
});
