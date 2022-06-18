import TestDBSchema, { TestDB } from './schema/testdb.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TestdbService } from './testdb.service';

describe('TestdbService', () => {
  let service: TestdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports:[DatabaseModule],
      imports:[
        MongooseModule.forRoot('mongodb+srv://thanhhuy:thanhhuy@cluster0.a0gzx.mongodb.net/?retryWrites=true&w=majority'),
        MongooseModule.forFeature([{name:TestDB.name,schema:TestDBSchema}])],
      providers: [TestdbService],
    }).compile();

    service = module.get<TestdbService>(TestdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
