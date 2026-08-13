import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',  
    }),
  //   TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     host: 'postgres',
  //     port: 5432,
  //     username: 'admin',
  //     password: '123',
  //     database: 'db',
  //     autoLoadEntities: true,
  //     synchronize: false,
  //   }),

    OrderModule,
    ProductModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
