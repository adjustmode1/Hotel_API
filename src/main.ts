import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // app.use(bodyParser());
  // await app.listen(3500);
  // app.connectMicroservice<MicroserviceOptions>()
  console.log('123: ',join(__dirname, '../src/testmicro/testmicro.proto'));

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url:'localhost:3600',
      package: 'greeter',
      protoPath: join(__dirname, '../src/proto/greeter/greeter.proto'),
      // protoPath: join(__dirname, './testmicro/testmicro.proto'),
    },
  });
  await app.listenAsync()
}
bootstrap();
