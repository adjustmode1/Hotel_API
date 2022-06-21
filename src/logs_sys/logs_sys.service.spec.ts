import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { LogsSysService } from './logs_sys.service';

describe('LogsSysService', () => {
  let service: LogsSysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     imports:[AppModule]
    }).compile();

    service = module.get<LogsSysService>(LogsSysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
