import { DatabaseModule } from './../database/database.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { LoginModule } from './login.module';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
describe('LoginController', () => {
  let app:INestApplication;
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        DatabaseModule,
        LoginModule
      ],
    }).compile();

    app = module.createNestApplication()
    await app.init();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
