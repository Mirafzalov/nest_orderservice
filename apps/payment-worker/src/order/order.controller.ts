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
    ) {
        let result: any
        let notification = {}


        try {
            const order = await this.orderService.create(data)

            
            notification = {status: 'paid'}

            result = order
            console.log('success')

        } catch(error) {
            console.log(error.message)
            

            notification = {status: 'failed'}

            result = error.message
            
            console.log('fail')

        }

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
