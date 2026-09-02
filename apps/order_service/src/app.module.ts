import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';

// import { pinoWaitingRoom } from './tracing/tracing';
// import pretty from 'pino-pretty';
// import { Writable } from 'stream';


// const customStream = new Writable({
//   write(chunk, encoding, callback) {
//     pinoWaitingRoom.push(chunk.toString());

//     callback();
//   }
// });

// const prettyStream = pretty({
// // colorize: false,
//   singleLine: true,
//   // ignore: 'pid,hostname',
//   messageFormat: '{ {msg} }',
//   destination: customStream,
// });


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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

    OrderModule,
    ProductModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
