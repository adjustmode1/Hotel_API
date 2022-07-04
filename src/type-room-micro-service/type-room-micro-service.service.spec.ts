import { Test, TestingModule } from '@nestjs/testing';
import { TypeRoomMicroServiceService } from './type-room-micro-service.service';

describe('TypeRoomMicroServiceService', () => {
  let service: TypeRoomMicroServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeRoomMicroServiceService],
    }).compile();

    service = module.get<TypeRoomMicroServiceService>(TypeRoomMicroServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
