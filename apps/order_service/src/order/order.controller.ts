import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from '../dto/order.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { MESSAGE_PATTERNS } from 'contracts/message-patterns';


@Controller('orders')
export class OrderController {
    constructor(
        @Inject('RABBIT_ORDER')
        private readonly rabbit: ClientProxy,
        private readonly logger: PinoLogger
    ) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() request: Request) {
        this.logger.info('Getting all orders...')
        
        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.ORDER_FINDALL, {}))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: CreateOrderDto) {
        this.logger.info('Creating a new order...')

        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.ORDER_CREATE, data))
    }


    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        this.logger.info(`Getting order with id = ${id}...`)
        
        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.ORDER_FINDONE, { id }))
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateOrderDto
    ) {
        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.ORDER_UPDATE, { id, data }))
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.ORDER_DELETE, { id }))
    }

}
