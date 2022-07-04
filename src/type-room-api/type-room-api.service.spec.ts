import { Test, TestingModule } from '@nestjs/testing';
import { TypeRoomApiService } from './type-room-api.service';

describe('TypeRoomApiService', () => {
  let service: TypeRoomApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeRoomApiService],
    }).compile();

    service = module.get<TypeRoomApiService>(TypeRoomApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
