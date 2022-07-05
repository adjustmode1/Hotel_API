import { TypeRoomMicroServiceController } from './../src/type-room-micro-service/type-room-micro-service.controller';
import { AppModule } from './../src/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { join } from 'path';

describe('TypeRoomMicroServiceController', () => {
  let controller: TypeRoomMicroServiceController;
  let app: INestApplication;
  let client: any;
  let id: string;
  let token: string;
  let server;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    server = server = app.getHttpAdapter().getInstance();
    const PROTO_PATH = join(
      __dirname,
      '../src/type-room-micro-service/type-room-micro-service.proto',
    );

    await app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3601',
        package: 'TypeRoom',
        protoPath: PROTO_PATH,
      },
    });
    const proto = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const protoGRPC = grpc.loadPackageDefinition(proto) as any;

    client = new protoGRPC.TypeRoom.TypeRoomMicroService(
      '0.0.0.0:3601',
      grpc.credentials.createInsecure(),
    );

    await app.startAllMicroservices();
    await app.init();

    await request(server)
      .post('/login/admin')
      .send({
        id: 'admin',
        password: 'adminadmin',
      })
      .then((res) => {
        const result = JSON.parse(res.text);
        token = result.data;
      });
    controller = module.get<TypeRoomMicroServiceController>(
      TypeRoomMicroServiceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all type room', async () => {
    return new Promise<void>((resolve) => {
      client.findAll({}, (err, result) => {
        expect(err).toBeNull();
        expect(Array.isArray(result.typeRooms)).toBe(true);
        resolve();
      });
    });
  });

  it('find One type Room', async () => {
    return new Promise<void>((resolve) => {
      client.findOne({ id: '62c24d17839f7b8b1b1b0f1e' }, (err, result) => {
        expect(err).toBeNull();
        expect(typeof result.typeRoom).toBe('object');
        resolve();
      });
    });
  });

  describe('create', () => {
    it('create new type room', async () => {
      const metadata = new grpc.Metadata();
      metadata.add('authorization', 'Bearer ' + token);
      return new Promise<void>((resolve) => {
        client.create(
          {
            name: 'micro create test',
            price: 13243,
          },
          metadata,
          (err, result) => {
            id = result['typeRoom']._id;
            expect(err).toBeNull();
            expect(typeof result['typeRoom']).toBe('object');
            resolve();
          },
        );
      });
    });

    it('create new type room not have token', async () => {
      return new Promise<void>((resolve) => {
        client.create(
          {
            name: 'micro create test',
            price: 13243,
          },
          (err, result) => {
            expect(err.toString()).toBe('Error: 2 UNKNOWN: Forbidden resource');
            resolve();
          },
        );
      });
    });

    it('create new type room not price', () => {
      const metadata = new grpc.Metadata();
      metadata.add('authorization', 'Bearer ' + token);
      return new Promise<void>((resolve) => {
        client.create(
          {
            name: 'micro create test',
          },
          metadata,
          (err, result) => {
            expect(err.toString()).toBe(
              'Error: 13 INTERNAL: .TypeRoom.createResponse.typeRoom: object expected',
            );
            resolve();
          },
        );
      });
    });

    it('create new type room not name', () => {
      const metadata = new grpc.Metadata();
      metadata.add('authorization', 'Bearer ' + token);
      return new Promise<void>((resolve) => {
        client.create(
          {
            price: 123123123,
          },
          metadata,
          (err, result) => {
            expect(err.toString()).toBe(
              'Error: 13 INTERNAL: .TypeRoom.createResponse.typeRoom: object expected',
            );
            resolve();
          },
        );
      });
    });

    it('create new type room not name and price', () => {
      const metadata = new grpc.Metadata();
      metadata.add('authorization', 'Bearer ' + token);
      return new Promise<void>((resolve) => {
        client.create({}, metadata, (err, result) => {
          expect(err.toString()).toBe(
            'Error: 13 INTERNAL: .TypeRoom.createResponse.typeRoom: object expected',
          );
          resolve();
        });
      });
    });
  });

  describe('update', () => {
    it('update type room', async () => {
      const metadata = new grpc.Metadata();
      metadata.add('authorization', 'Bearer ' + token);
      return new Promise<void>((resolve) => {
        client.update(
          {
            id,
            name: 'micro update',
            price: 13243,
          },
          metadata,
          (err, result) => {
            expect(err).toBeNull();
            expect(typeof result).toBe('object');
            resolve();
          },
        );
      });
    });

    it('update type room with loss param', async () => {
      const metadata = new grpc.Metadata();
      metadata.add('authorization', 'Bearer ' + token);
      return new Promise<void>((resolve) => {
        client.update(
          {
            id,
            price: 13243,
          },
          metadata,
          (err, result) => {
            expect(err).toBeNull();
            expect(typeof result).toBe('object');
            resolve();
          },
        );
      });
    });

    it('update type room not have token', async () => {
      return new Promise<void>((resolve) => {
        client.update(
          {
            id,
            name: 'update micro',
            price: 13243,
          },
          (err, result) => {
            expect(err.toString()).toBe('Error: 2 UNKNOWN: Forbidden resource');
            resolve();
          },
        );
      });
    });
  });

  describe('delete', () => {
    it('delete type room', () => {
      const metadata = new grpc.Metadata();
      metadata.add('authorization', 'Bearer ' + token);
      return new Promise<void>((resolve) => {
        client.remove(
          {
            id,
          },
          metadata,
          (err, result) => {
            expect(err).toBeNull();
            expect(typeof result).toBe('object');
            resolve();
          },
        );
      });
    });

    it('delete type room not have token', async () => {
      return new Promise<void>((resolve) => {
        client.remove(
          {
            id,
          },
          (err, result) => {
            expect(err.toString()).toBe('Error: 2 UNKNOWN: Forbidden resource');
            resolve();
          },
        );
      });
    });
  });
  afterEach(async () => {
    await app.close();
  });
});
