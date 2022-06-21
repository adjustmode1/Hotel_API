import { AppModule } from './../src/app.module';
import { LogsSysController } from './../src/logs_sys/logs_sys.controller';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('LogsSysController', () => {
  let controller: LogsSysController;
  let app: INestApplication;
  let token;

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

    controller = module.get<LogsSysController>(LogsSysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('list all logs', () => {
    return request(app.getHttpServer())
      .get('/logsSys/list')
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
  });

  it('list one logs', () => {
    return request(app.getHttpServer())
      .get('/logsSys/62a953b890e09519a35b8961')
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
  });
});
