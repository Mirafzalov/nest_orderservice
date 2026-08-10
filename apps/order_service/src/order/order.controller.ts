import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';



@Controller('orders')
export class OrderController {
    constructor(private readonly orderservice: OrderService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.orderservice.findAll()
    }

    @Post()
    async create(@Body() data: CreateOrderDto) {
        return await this.orderservice.create(data)

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
        return this.orderservice.remove(id)
    }

}
