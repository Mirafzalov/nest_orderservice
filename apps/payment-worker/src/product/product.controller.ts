import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateOrderDto } from '../dto/order.dto';
import { CreateProductDto } from '../dto/product.dto';
import { error } from 'console';

@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }


    @MessagePattern('product.findAll')
    findAll(@Payload() data: any) {
        return this.productService.findAll()
    }

    @MessagePattern('product.create')
    async create(
        @Payload() data: CreateProductDto
    ) {
        try {
            const result = await this.productService.create(data)

            return result

        } catch (error) {

            console.log(error)
        }
    }

    @MessagePattern('product.findOne')
    findOne(@Payload() id: { id: number }) {
        return this.productService.findOne(id)
    }

    @MessagePattern('product.update')
    update(@Payload() data: { id: number, productData: CreateOrderDto }) {
        return this.productService.update(data.id, data.productData)
    }

    @MessagePattern('product.delete')
    remove(@Payload() id: number) {
        return this.productService.remove(id)
    }


}
