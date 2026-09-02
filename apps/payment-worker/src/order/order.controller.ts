import { Controller, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order.dto';
import { PinoLogger } from 'nestjs-pino';
import { MESSAGE_PATTERNS } from 'contracts/message-patterns';

@Controller('order')
export class OrderController {
    constructor(
        @Inject('RABBIT_NOTIFICATION')
        private readonly rabbit: ClientProxy,
        private readonly orderService: OrderService,
        private readonly logger: PinoLogger
    ) { }

    @MessagePattern(MESSAGE_PATTERNS.ORDER_FINDALL)
    findAll(@Payload() data: any) {
        this.logger.info('Proccessing all orders...') 
        return this.orderService.findAll()
    }

    @MessagePattern(MESSAGE_PATTERNS.ORDER_CREATE)
    async create(
        @Payload() data: CreateOrderDto,
    ) {
        this.logger.info('Proccessing new order... ')

        let result: any
        let notification = {}


        try {
            const order = await this.orderService.create(data)

            notification = { status: 'paid' }

            result = order

        } catch (error) {
            console.log(error.message)


            notification = { status: 'failed' }

            result = error.message

        }

        this.rabbit.emit('notification.status', { notification, result })

        return result

    }


    @MessagePattern(MESSAGE_PATTERNS.ORDER_FINDONE)
    findOne(@Payload() id: number) {
        this.logger.info(`Proccessing order with id = ${id}...`)
        return this.orderService.findOne(id)
    }

    @MessagePattern(MESSAGE_PATTERNS.ORDER_UPDATE)
    update(@Payload() orderData: { id: number, data: CreateOrderDto }) {
        return this.orderService.update(orderData.id, orderData.data)
    }

    @MessagePattern(MESSAGE_PATTERNS.ORDER_DELETE)
    remove(@Payload() id: number) {
        return this.orderService.remove(id)
    }
}   
