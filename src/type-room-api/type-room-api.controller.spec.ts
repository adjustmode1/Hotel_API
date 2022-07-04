import { Test, TestingModule } from '@nestjs/testing';
import { TypeRoomApiController } from './type-room-api.controller';
import { TypeRoomApiService } from './type-room-api.service';

describe('TypeRoomApiController', () => {
  let controller: TypeRoomApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeRoomApiController],
      providers: [TypeRoomApiService],
    }).compile();

    controller = module.get<TypeRoomApiController>(TypeRoomApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
