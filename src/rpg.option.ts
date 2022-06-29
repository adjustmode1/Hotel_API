import { Transport } from '@nestjs/microservices';
import { ClientOptions } from "@grpc/grpc-js";
import { join } from 'path';

export const microServiceOptions: ClientOptions = {
    transport:Transport.GRPC,
    options:{
        package:'app',
        protoPath:join(__dirname,'../src/testmicro/proto/testmicro.proto')
    }
}