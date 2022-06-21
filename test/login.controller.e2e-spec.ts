import { AdminLoginDto } from './../src/login/dto/admin.login.dto';
import { LoginDto } from './../src/login/dto/login.dto';
import { LoginModule } from './../src/login/login.module';
import { DatabaseModule } from './../src/database/database.module';
import { LoginController } from './../src/login/login.controller';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
describe('LoginController', () => {
  let app: INestApplication;
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, LoginModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login user with body success', async () => {
    const body = new LoginDto();
    body.gmail = 'adjustmode1@gmail.com';
    body.password = 'adminadmin';
    const result = await controller.loginUser(body);
    expect(result.status).toBe(200);
    expect(result.data).not.toBeNull();
  });

  it('login user with body wrong password', async () => {
    const body = new LoginDto();
    body.gmail = 'adjustmode1@gmail.com';
    body.password = 'adminadmin11';
    const result = await controller.loginUser(body);
    expect(result.status).toBe(200);
    expect(result.data).toBe('login failse');
  });

  it('login user with body wrong gmail', async () => {
    const body = new LoginDto();
    body.gmail = 'adjustmode11111@gmail.com';
    body.password = 'adminadmin11';
    const result = await controller.loginUser(body);
    expect(result.status).toBe(400);
    expect(result.data).toBe('not found');
  });

  it('login admin with body success', async () => {
    const body = new AdminLoginDto();
    body.id = 'admin';
    body.password = 'adminadmin';
    const result = await controller.loginAdmin(body);
    expect(result.status).toBe(200);
    expect(result.data).not.toBeNull();
  });

  it('login admin with body wrong password', async () => {
    const body = new AdminLoginDto();
    body.id = 'admin';
    body.password = 'adminadmin11';
    const result = await controller.loginAdmin(body);
    expect(result.status).toBe(200);
    expect(result.data).toBe('login failse');
  });

  it('login admin with body wrong id', async () => {
    const body = new AdminLoginDto();
    body.id = 'adjuadmin';
    body.password = 'adminadmin11';
    const result = await controller.loginAdmin(body);
    expect(result.status).toBe(400);
    expect(result.data).toBe('not found');
  });
});
