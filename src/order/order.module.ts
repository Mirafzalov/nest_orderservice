import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DataService } from 'src/db/data.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, DataService]
})
export class OrderModule {}
