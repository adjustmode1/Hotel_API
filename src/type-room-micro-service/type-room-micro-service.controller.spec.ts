import { Test, TestingModule } from '@nestjs/testing';
import { TypeRoomMicroServiceController } from './type-room-micro-service.controller';
import { TypeRoomMicroServiceService } from './type-room-micro-service.service';

describe('TypeRoomMicroServiceController', () => {
  let controller: TypeRoomMicroServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeRoomMicroServiceController],
      providers: [TypeRoomMicroServiceService],
    }).compile();

    controller = module.get<TypeRoomMicroServiceController>(TypeRoomMicroServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
