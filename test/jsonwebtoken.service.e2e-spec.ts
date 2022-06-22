import { JsonwebtokenService } from './../src/jsonwebtoken/jsonwebtoken.service';
import { JsonwebtokenModule } from './../src/jsonwebtoken/jsonwebtoken.module';
// import { JsonwebtokenModule } from './jsonwebtoken.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('JsonwebtokenService', () => {
  let service: JsonwebtokenService;
  let tokenRight: string;
  const tokenExpried =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7Im5hbWUiOiJmYXdlIn0sImlhdCI6MTY1NTUyNTIzOSwiZXhwIjoxNjU1NTI4ODM5fQ.jxD5k5wgumHUfLbqFHCOYFTHJJBTs3dNK4El32CLt0s';
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JsonwebtokenModule],
    }).compile();

    service = module.get<JsonwebtokenService>(JsonwebtokenService);

    tokenRight = await service.sign({ name: 'data temp' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sign token', () => {
    const result = service.sign({ name: 'fawe' });
    expect(result).not.toBeNull();
  });

  it('verify token success', async () => {
    const result = service.check(tokenRight);
    expect(result.status).toBe(2000);
  });

  it('verify token expried', async () => {
    const result = await service.check(tokenExpried);
    expect(result.status).toBe(400);
    expect(result.data.name).toBe('TokenExpiredError');
  });

  it('verify token expried', async () => {
    const result = await service.check(tokenExpried);
    expect(result.status).toBe(400);
    expect(result.data.name).toBe('TokenExpiredError');
  });
});
