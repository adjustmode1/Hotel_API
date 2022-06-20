import { AppModule } from './../app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as FormData from 'form-data';
import * as request from 'supertest';
import * as fs from 'fs';
import { stringify } from 'querystring';

describe('UserController', () => {
  let controller: UserController;
  let app:INestApplication;
  let token;
  let data:FormData;
  let boundary:string;
  let id;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();

    app = module.createNestApplication()
    await app.init()

    await request(app.getHttpServer()).post('/login/admin').send({
        id:'admin',
        password:'adminadmin'
      }).then(res=>{
        const result = JSON.parse(res.text);
        token = result.data;
      })

    data = new FormData()
    data.append('gmail','adjustmodetemp@gmail.com')
    data.append('password','adminadmin')
    data.append('name','hy')
    data.append('gender','1')
    data.append('phone','0125485155')
    data.append('birthday','2000-02-01')
    const file = await fs.readFileSync('src/testUpload/z22.jpg');
    data.append('avatar',file,'z22.jpg')

    boundary = data.getBoundary()

    controller = module.get<UserController>(UserController);
  });

  it('create new user with image',()=>{
    return request(app.getHttpServer())
            .post('/user/create')
            .set('Content-Type',`multipart/form-data; boundary=${boundary}`)
            .send(data.getBuffer().toString())
            .then(res=>{
              id = JSON.parse(res.text).data[0]._id;
            })
  })

  it('delete user',()=>{
    return request(app.getHttpServer())
              .delete(`/user/${id}`)
              .auth(token,{
                type:'bearer'
              })
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('list all users',async ()=>{
    return request(app.getHttpServer())
                .get('/user/list')
                .expect(200)
  })

  it('find one users',async()=>{
    return request(app.getHttpServer())
            .get('/user/62a955f4763250074914bd01')
            .expect(200)
  })



});
