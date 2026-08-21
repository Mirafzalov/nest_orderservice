import { Module } from '@nestjs/common';
import { PaymentWorkerController } from './payment-worker.controller';
import { PaymentWorkerService } from './payment-worker.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from './rabbit/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

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


    OrderModule, ProductModule, UserModule, RabbitMQModule, HealthModule],
  controllers: [PaymentWorkerController],
  providers: [PaymentWorkerService],
})
export class PaymentWorkerModule { }
