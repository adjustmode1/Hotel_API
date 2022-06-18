// import { JsonwebtokenModule } from './jsonwebtoken.module';
import { Test, TestingModule } from '@nestjs/testing';
import { JsonwebtokenModule } from './jsonwebtoken.module';
import { JsonwebtokenService } from './jsonwebtoken.service';

describe('JsonwebtokenService', () => {
  let service: JsonwebtokenService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[JsonwebtokenModule]
    }).compile();

    service = module.get<JsonwebtokenService>(JsonwebtokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sign token',()=>{
    const result = service.sign({name:"fawe"});
    console.log(result)
    expect(result).not.toBeNull()
  })

  it('verify token',async ()=>{
    const result = service.check('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7Im5hbWUiOiJmYXdlIn0sImlhdCI6MTY1NTUyNTIzOSwiZXhwIjoxNjU1NTI4ODM5fQ.jxD5k5wgumHUfLbqFHCOYFTHJJBTs3dNK4El32CLt0s');
    expect(result).not.toBeNull()
  })
});
