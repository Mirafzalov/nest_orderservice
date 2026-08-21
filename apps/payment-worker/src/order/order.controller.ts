import { Controller, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order.dto';


@Controller('order')
export class OrderController {
    constructor(
        @Inject('RABBIT_NOTIFICATION')
        private readonly rabbit: ClientProxy,
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
        let result: any
        let notification = {}


        try {
            const order = await this.orderService.create(data)

            channel.ack(message)
            
            notification = {status: 'paid'}

            result = order
            console.log('success')

        } catch(error) {
            console.log(error.message)
            
            channel.nack(message, false, false)   

            notification = {status: 'failed'}

            result = error.message
            
            console.log('fail')

        }
        console.log('IT WORKED')

        this.rabbit.emit('notification.status', {notification, result})

        return result

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
