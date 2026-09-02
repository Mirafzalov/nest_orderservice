import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PinoLogger } from 'nestjs-pino';
import { MESSAGE_PATTERNS } from 'contracts/message-patterns';



@Controller('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(
        @Inject('RABBIT_PRODUCT')
        private readonly rabbit: ClientProxy,
        private readonly logger: PinoLogger
    ) { }

    @Get()
    async findAllProduct() {
        this.logger.info('Getting all products...')

        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.PRODUCT_FINDALL, {}))
    }

    @Post()
    async create(@Body() data: CreateProductDto) {
        this.logger.info('Creating product... ')

        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.PRODUCT_CREATE, data))
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        this.logger.info({ msg: `Finding product with id = ${id}...` })

        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.PRODUCT_FINDONE, { id: id }))
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() productData: CreateProductDto) {
        this.logger.info(`Updating product with id = ${id}...`)

        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.PRODUCT_UPDATE, { id, productData }))
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        this.logger.info(`Deleted product with id = ${id}...`)

        return await firstValueFrom(this.rabbit.send(MESSAGE_PATTERNS.PRODUCT_DELETE, { id }))
    }
}
