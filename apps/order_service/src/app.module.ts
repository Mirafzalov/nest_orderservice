import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,

        serializers: {
          req: () => undefined,
          res: () => undefined
        },

        transport: {
          target: 'pino-pretty',
          options: {
            colorize: false,
            singleLine: true,

            ignore: 'pid,hostname',

            messageFormat: '{msg}',
          },
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
