import { Module } from '@nestjs/common';
import { PaymentWorkerController } from './payment-worker.controller';
import { PaymentWorkerService } from './payment-worker.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from './rabbit/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { Writable } from 'stream';
import pretty from 'pino-pretty';
import { pinoWaitingRoom } from './tracing/tracing';




// const customStream = new Writable({
//   write(chunk, encoding, callback) {
//     pinoWaitingRoom.push(chunk.toString());

//     callback();
//   }
// });

// const prettyStream = pretty({
//   colorize: false,
//   singleLine: true,
//   ignore: 'pid,hostname',
//   messageFormat: '{msg}',
//   destination: customStream,
// });



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: '123',
      database: 'db',
      autoLoadEntities: true,
      synchronize: false,
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,

        base: undefined,
        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
          })
        },

      },
    }),


    OrderModule, ProductModule, UserModule, RabbitMQModule, HealthModule],

  controllers: [PaymentWorkerController],
  providers: [
    PaymentWorkerService
  ],
})

export class PaymentWorkerModule { }
