import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:3600',
      package: 'testmicro',
      protoPath: join(__dirname, '../src/testmicro/testmicro.proto'),
    },
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:3601',
      package: 'TypeRoom',
      protoPath: join(
        __dirname,
        '../src/type-room-micro-service/type-room-micro-service.proto',
      ),
    },
  });
  await app.startAllMicroservices();
  await app.listen(3500);
}
bootstrap();
