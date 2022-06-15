import { Test, TestingModule } from '@nestjs/testing';
import { TestappController } from './testapp.controller';
import { TestappService } from './testapp.service';

describe('TestappController', () => {
  let controller: TestappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestappController],
      providers: [TestappService],
    }).compile();

    controller = module.get<TestappController>(TestappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
