import { AppModule } from './../app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as FormData from 'form-data';
import * as request from 'supertest';


describe('UserController', () => {
  let controller: UserController;
  let app:INestApplication;
  let token;
  let data;
  beforeEach(async () => {
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

    const data = new FormData()
    data.append('gmail','adjustmode11@gmail.com')
    data.append('password','adminadmin')
    data.append('name','hy')
    data.append('gender','1')
    data.append('birthday','2000-02-01')

    // console.log(data)
    controller = module.get<UserController>(UserController);
  });

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

  it('delete one user',()=>{
    return request(app.getHttpServer())
              .delete('/user/629ecc7db899b68bec48adb1')
              .auth(token,{
                type:'bearer'
              })
  })

  // it('create new user with image',()=>{
  //   return request(app.getHttpServer())
  //           .post('/user/create')
  //           .set('Content-Type','multipart/form-data; charset=utf-8; boundary=----WebKitFormBoundarydMIgtiA2YeB1Z0kl')
  //           .send(data)
            // .then(res=>{
            //   console.log('res',res.text)
            // })
  // })
});
