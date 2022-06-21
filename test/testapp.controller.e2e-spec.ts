import { AppModule } from './../src/app.module';
import { TestappController } from './../src/testapp/testapp.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('TestappController', () => {
  let controller: TestappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<TestappController>(TestappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
