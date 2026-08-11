import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateOrderDto } from '../dto/order.dto';

@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }


    @MessagePattern('product.findAll')
    findAll(@Payload() data: any) {
        return this.productService.findAll()
    }

    @MessagePattern('product.create')
    create(@Payload() data) {
        return this.productService.create(data)
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
