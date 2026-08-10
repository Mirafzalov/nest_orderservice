import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../db/entities/order.entity';
import { OrderProduct } from '../db/entities/orderProduct.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct]),
  ClientsModule.register([
    {
      name: 'ORDER_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'],
        queue: 'order_service_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  ]),

  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { } 
