import { Test, TestingModule } from '@nestjs/testing';
import { TestmicroService } from './testmicro.service';

describe('TestmicroService', () => {
  let service: TestmicroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestmicroService],
    }).compile();

    service = module.get<TestmicroService>(TestmicroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
