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

  it('list all logs', async () => {
    const result = await request(app.getHttpServer())
      .get('/logsSys/list')
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
    const arr = JSON.parse(result.text);
    expect(arr.length).toBeGreaterThan(0);
  });

  it('list all not have token', async () => {
    const result = await request(app.getHttpServer())
      .get('/logsSys/62a953b890e09519a35b8961')
      .expect(400);
    expect(result.text).toBe('unauthorization');
  });

  it('list one logs', async () => {
    const result = await request(app.getHttpServer())
      .get('/logsSys/62a953b890e09519a35b8961')
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
    const arr = JSON.parse(result.text);
    expect(arr.length).toBe(1);
  });

  it('list one logs not have token', async () => {
    const result = await request(app.getHttpServer())
      .get('/logsSys/62a953b890e09519a35b8961')
      .expect(400);
    expect(result.text).toBe('unauthorization');
  });

  it('list one logs not found', async () => {
    const result = await request(app.getHttpServer())
      .get('/logsSys/62a953b890e09519a35b8231')
      .auth(token, {
        type: 'bearer',
      })
      .expect(200);
    const arr = JSON.parse(result.text);
    expect(arr.length).toBe(0);
  });
});
