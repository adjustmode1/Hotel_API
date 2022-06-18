import { HashModule } from './hash.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';


describe('HashService', () => {
  let app:INestApplication;
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[HashModule],
    })
    .overrideProvider(HashService)
    .useValue(service)
    .compile();

    app = module.createNestApplication()
    await app.init();

    service = module.get<HashService>(HashService);
  });

  it('hash password',()=>{
    expect(service.hash('string to hash')).not.toBeNull()
  })
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('compare password true', async ()=>{
      const result = await service.compare('adminadmin','$2b$10$kqzab5TJh.ZwKH/TQBtw6ezPpYjO4ZhcZcWV7pOmKw85vDeX8zJ9q');
      expect(result).toEqual(true)
  })

  it('compare password false', async ()=>{
      const result = await service.compare('wrong password','$2b$10$kqzab5TJh.ZwKH/TQBtw6ezPpYjO4ZhcZcWV7pOmKw85vDeX8zJ9q');
      expect(result).toEqual(false)
  })

});
