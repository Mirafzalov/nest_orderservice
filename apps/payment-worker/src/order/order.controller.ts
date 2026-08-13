import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order.dto';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @MessagePattern('orders.findAll')
    findAll(@Payload() data: any) {
        return this.orderService.findAll()
    }

    @MessagePattern('order.create')
    async create(
        @Payload() data: CreateOrderDto,
        @Ctx() context: RmqContext
    ) {
        const message = context.getMessage()
        const channel = context.getChannelRef()

        try {
            const order = await this.orderService.create(data)

            channel.ack(message)


            return order

        } catch(error) {
            console.log(error.message)
            channel.nack(message, false, false)   

            return {message: error}
        }

    }
    @MessagePattern('order.findOne')
    findOne(@Payload() id: number) {
        return this.orderService.findOne(id)
    }

    @MessagePattern('order.update')
    update(@Payload() orderData: {id: number, data: CreateOrderDto}) {
        return this.orderService.update(orderData.id, orderData.data)
    }

    @MessagePattern('order.delete')
    remove(@Payload() id: number) {
        return this.orderService.remove(id)
    }
}   
