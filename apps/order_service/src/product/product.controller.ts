import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(
        @Inject('RABBIT_PRODUCT')
        private readonly rabbit: ClientProxy
    ) { }

    @Get()
    async findAllProduct() {
        return await firstValueFrom(this.rabbit.send('product.findAll', {}))
    }

    @Post()
    async create(@Body() data: CreateProductDto) {
        return await firstValueFrom(this.rabbit.send('product.create', data))
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(this.rabbit.send('product.findOne', { id: id }))
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() productData: CreateProductDto) {
        return await firstValueFrom(this.rabbit.send('product.update', { id, productData }))
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(this.rabbit.send('product.delete', id))
    }
}
