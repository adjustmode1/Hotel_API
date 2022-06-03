import { Test, TestingModule } from '@nestjs/testing';
import { LogsSysController } from './logs_sys.controller';
import { LogsSysService } from './logs_sys.service';

describe('LogsSysController', () => {
  let controller: LogsSysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsSysController],
      providers: [LogsSysService],
    }).compile();

    controller = module.get<LogsSysController>(LogsSysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
