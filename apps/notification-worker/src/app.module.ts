import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './health/health.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        autoLogging: false,

        base: undefined,

        serializers: {
          req: (req) => ({
            method: req.method,
            url: req.url,
          }),
          res: () => undefined
        },
      },
    }),


    NotificationModule,
    HealthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
