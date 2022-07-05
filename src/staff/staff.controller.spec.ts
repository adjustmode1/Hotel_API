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

  describe('find', () => {
    it('find all staff', async () => {
      const result = await request(app.getHttpServer())
        .get('/staff/list')
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
      const res = JSON.parse(result.text);
      expect(res.length).toBeGreaterThan(0);
    });

    it('find all staff not have token', async () => {
      const result = await request(app.getHttpServer())
        .get('/staff/list')
        .expect(400);
      expect(result.text).toBe('unauthorization');
    });

    it('find one staff', async () => {
      const result = await request(app.getHttpServer())
        .get('/staff/62a95212bcdff37025a39f5e')
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
      const res = JSON.parse(result.text);
      expect(res).toBeDefined();
    });

    it('find one staff not have token', async () => {
      const result = await request(app.getHttpServer())
        .get('/staff/62a95212bcdff37025a39f5e')
        .expect(400);
      expect(result.text).toBe('unauthorization');
    });

    it('find one staff not found', async () => {
      return request(app.getHttpServer())
        .get('/staff/62a95212bcdff37025a3325e')
        .expect(400);
    });
  });
  describe('create', () => {
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

    it('create new staff not have token', async () => {
      const result = await request(app.getHttpServer())
        .post('/staff/create')
        .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
        .send(data.getBuffer().toString());

      expect(result.text).toBe('unauthorization');
    });

    it('create new staff loss param', async () => {
      const form = new FormData();
      form.append('loss', '123');
      const result = await request(app.getHttpServer())
        .post('/staff/create')
        .set(
          'Content-Type',
          `multipart/form-data; boundary=${form.getBoundary()}`,
        )
        .send(data.getBuffer().toString())
        .expect(400);
      console.log(result.text);
      // expect(result.text).toBe('unauthorization')
    });
  });
  describe('update', () => {
    it('update staff', () => {
      console.log('f', data);
      console.log('id', id);
      data.append('_id', id);
      return request(app.getHttpServer())
        .put('/staff/update')
        .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
        .auth(token, {
          type: 'bearer',
        })
        .send(data.getBuffer().toString());
    });

    it('update staff loss param', async () => {
      const form = new FormData();
      form.append('loss', '123');
      const result = await request(app.getHttpServer())
        .post('/staff/update')
        .set(
          'Content-Type',
          `multipart/form-data; boundary=${form.getBoundary()}`,
        )
        .send(data.getBuffer().toString())
        .expect(400);
      console.log(result.text);
      // expect(result.text).toBe('unauthorization')
    });

    it('update staff not have token', async () => {
      const result = await request(app.getHttpServer())
        .put('/staff/update')
        .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
        .send(data.getBuffer().toString());

      expect(result.text).toBe('unauthorization');
    });
  });
  describe('delete', () => {
    it('delete staff', () => {
      return request(app.getHttpServer())
        .delete(`/staff/delete/${id}`)
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
    });

    it('delete staff not found', () => {
      return request(app.getHttpServer())
        .delete(`/staff/delete/2a956f2a3c48bdd5c091bc44`)
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
    });

    it('delete staff not have token', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/staff/delete/${id}`)
        .expect(400);
      expect(result.text).toBe('unauthorization');
    });
  });
});
