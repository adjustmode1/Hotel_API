import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TestappService } from './testapp.service';

describe('TestappService', () => {
  let service: TestappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<TestappService>(TestappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
