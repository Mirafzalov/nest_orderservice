import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dto/product.dto';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}

    @Get()
    findAll(){
        return this.productService.findAll()
    }

    @Post()
    create(@Body() data: CreateProductDto){
        return this.productService.create(data)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.productService.findOne(id)        
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateProductDto){
        return this.productService.update(id, data) 
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.productService.remove(id)
    }
}
