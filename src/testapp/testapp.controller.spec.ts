import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TestappController } from './testapp.controller';

describe('TestappController', () => {
  let controller: TestappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();

    controller = module.get<TestappController>(TestappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
