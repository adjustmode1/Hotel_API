import { TestdbModule } from './../src/testdb/testdb.module';
import { DatabaseModule } from './../src/database/database.module';
import { TestdbService } from './../src/testdb/testdb.service';
import { TestdbController } from './../src/testdb/testdb.controller';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('TestdbController', () => {
  let app: INestApplication;
  let controller: TestdbController;
  let testDBServices: TestdbService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TestdbModule],
    })
      .overrideProvider(TestdbService)
      .useValue(testDBServices)
      .compile();
    app = module.createNestApplication();
    await app.init();
    controller = module.get<TestdbController>(TestdbController);
    testDBServices = module.get<TestdbService>(TestdbService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('list testdb', () => {
    return request(app.getHttpServer()).get('/testdb/list').expect(200);
  });

  it('create testdb', () => {
    return request(app.getHttpServer())
      .post('/testdb')
      .send({
        name: 'name 1',
      })
      .expect(201);
  });
});
