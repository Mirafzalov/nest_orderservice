import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderProduct } from 'src/db/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {} 
