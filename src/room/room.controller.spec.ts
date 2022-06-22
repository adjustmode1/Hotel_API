import { INestApplication } from '@nestjs/common';
import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import * as request from 'supertest';
import * as FormData from 'form-data';
import * as fs from 'fs';

describe('RoomController', () => {
  let controller: RoomController;
  let app: INestApplication;
  let token;
  let id;
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
    data.append('name', 'p temp');
    data.append('idTypeRoom', '62a956f2a3c48bdd5c091bc4');
    data.append('status', 'true');
    let file = await fs.readFileSync('src/testUpload/z22.jpg');
    data.append('images', file, 'z22.jpg');
    file = await fs.readFileSync('src/testUpload/z33.jpg');
    data.append('images', file, 'z33.jpg');

    boundary = data.getBoundary();

    controller = module.get<RoomController>(RoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find',()=>{
    it('find all room', async () => {
      const result = await request(app.getHttpServer())
                            .get('/room/list')
                            .expect(200);
      const arr = JSON.parse(result.text)
      expect(arr.length).toBeGreaterThan(0)
    });
  
    it('find One room', async () => {
      const result = await request(app.getHttpServer())
        .get('/room/62a95ae67595a539e1fd3a06')
        .expect(200);
        const arr = JSON.parse(result.text)
        expect(arr.data.length).toBe(1)
    });
  })

  describe('create',()=>{
    it('create new room', () => {
      return request(app.getHttpServer())
        .post('/room/create')
        .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
        .auth(token, {
          type: 'bearer',
        })
        .send(data.getBuffer().toString())
        .then((res) => {
          const result = JSON.parse(res.text);
          id = result[0]._id;
        })
    });

    it('create new room loss param', async () => {
      const form = new FormData()
      form.append('loss','123')
      const result = await request(app.getHttpServer())
        .post('/room/create')
        .set('Content-Type', `multipart/form-data; boundary=${form.getBoundary()}`)
        .auth(token, {
          type: 'bearer',
        })
        .send(data.getBuffer().toString())

        const res = JSON.parse(result.text)
        expect(res.error).toBe('Bad Request')
    });

    it('create new room not have token', async () => {
      const result = await request(app.getHttpServer())
        .post('/room/create')
        .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
        .send(data.getBuffer().toString())

        expect(result.text).toBe('unauthorization')
    });
  
    it('create new room loss param', async () => {
      const form = new FormData()
      form.append('loss','123');
      const result = await request(app.getHttpServer())
        .post('/room/create')
        .set('Content-Type', `multipart/form-data; boundary=${form.getBoundary()}`)
        .auth(token, {
          type: 'bearer',
        })
        .send(data.getBuffer().toString())
      const res = JSON.parse(result.text)
      expect(res.error).toBe('Bad Request')
    });
  
    it('create new room not have token', async () => {
      const result = await request(app.getHttpServer())
        .post('/room/create')
        .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
        .send(data.getBuffer().toString())
  
        expect(result.text).toBe('unauthorization')
    });
  })

  describe('update',()=>{
    it('update room', () => {
      data.append('_id', id);
      return request(app.getHttpServer())
        .patch('/room/update')
        .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
        .auth(token, {
          type: 'bearer',
        })
        .send(data.getBuffer().toString());
    });
  
    it('update room not have token', async () => {
      const result = await request(app.getHttpServer())
        .patch('/room/update')
        .set('Content-Type', `multipart/form-data; boundary=${boundary}`)
        .send(data.getBuffer().toString());
  
        expect(result.text).toBe('unauthorization')
    });
  })

  describe("delete",()=>{
    it('delete room', () => {
      return request(app.getHttpServer())
        .delete(`/room/${id}`)
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
    });
  
    it('delete room not found', () => {
      return request(app.getHttpServer())
        .delete(`/room/62a956f2a3c48bdd5c091bc4`)
        .auth(token, {
          type: 'bearer',
        })
        .expect(200);
    });
  
    it('delete room not have token', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/room/${id}`)
        .expect(400);
  
        expect(result.text).toBe('unauthorization')
    });
  })
});
