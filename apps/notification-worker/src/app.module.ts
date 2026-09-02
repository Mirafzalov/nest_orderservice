import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
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
      envFilePath: '.env',
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        // autoLogging: false,

        // serializers: {
        //   req: () => undefined,
        //   res: () => undefined
        // },

        // stream: prettyStream
      },
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
