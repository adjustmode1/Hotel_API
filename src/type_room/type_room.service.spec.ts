import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeRoomService } from './type_room.service';

describe('TypeRoomService', () => {
  let service: TypeRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<TypeRoomService>(TypeRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
