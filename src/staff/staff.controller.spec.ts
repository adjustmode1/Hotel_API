import { INestApplication } from '@nestjs/common';
import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { StaffController } from './staff.controller';
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

  it('find all staff', () => {
    return request(app.getHttpServer())
      .get('/staff/list')
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
  });

  it('find one staff', () => {
    return request(app.getHttpServer())
      .get('/staff/62a95212bcdff37025a39f5e')
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
  });

  it('create new staff', () => {
    return request(app.getHttpServer())
      .post('/staff/create')
      .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
      .auth(token, {
        type: 'bearer',
      })
      .send(data.getBuffer().toString())
      .then((res) => {
        const result = JSON.parse(res.text);
        id = result[0]._id;
      });
  });

  it('update staff', () => {
    data.append('_id', id);
    return request(app.getHttpServer())
      .put('/staff/update')
      .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
      .auth(token, {
        type: 'bearer',
      })
      .send(data.getBuffer().toString());
  });

  it('delete staff', () => {
    return request(app.getHttpServer())
      .delete(`/staff/delete/${id}`)
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
  });
});
