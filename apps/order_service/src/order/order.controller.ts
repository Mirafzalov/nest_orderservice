import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
// import { OrderService } from './order.service';
import { CreateOrderDto } from '../dto/order.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { request } from 'http';



@Controller('orders')
export class OrderController {
    constructor(
        @Inject('RABBIT_ORDER')
        private readonly rabbit: ClientProxy) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() request: Request) {
        return await firstValueFrom(this.rabbit.send('orders.findAll', {}))
    }

    @Post()
    async create(@Body() data: CreateOrderDto) {
        return await firstValueFrom(this.rabbit.send('order.create', data))

    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(this.rabbit.send('order.findOne', id))
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateOrderDto
    ) {
        return await firstValueFrom(this.rabbit.send('order.update', {id, data}))
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(this.rabbit.send('order.delete', id))
    }

}
