import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { RabbitMQModule } from '../rabbit/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule.register({
      name: 'RABBIT_ORDER',
      queue: 'order_queue'
    })
  ],

  controllers: [OrderController],
  providers: []
})
export class OrderModule { } 
