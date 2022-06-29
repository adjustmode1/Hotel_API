import { Test, TestingModule } from '@nestjs/testing';
import { TestmicroController } from './testmicro.controller';
import { TestmicroService } from './testmicro.service';

describe('TestmicroController', () => {
  let controller: TestmicroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestmicroController],
      providers: [TestmicroService],
    }).compile();

    controller = module.get<TestmicroController>(TestmicroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
