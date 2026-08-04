import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order.dto';



@Controller('orders')
export class OrderController {
    constructor(private readonly orderservice: OrderService) { }

    @Get()
    findAll() {
        return this.orderservice.findAll()
    }

    @Post()
    create(@Body() data: CreateOrderDto) {
        return this.orderservice.create(data)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.orderservice.findOne(id)
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateOrderDto
    ) {
        return this.orderservice.update(id, data)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.orderservice.remove(+id)
    }

}
