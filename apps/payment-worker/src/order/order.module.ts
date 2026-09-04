import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../db/entities/order.entity';
import { OrderProduct } from '../db/entities/orderProduct.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_QUEUE } from 'apps/notification-worker/contracts/notification.constants';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule,
        TypeOrmModule.forFeature([Order, OrderProduct]),

        ClientsModule.register([{
            name: 'RABBIT_NOTIFICATION',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@rabbitmq:5672'],
                queue: 'notification_queue',
                noAck: true,
                queueOptions: {
                    durable: true,
                }
            }

        }]),
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule { }
