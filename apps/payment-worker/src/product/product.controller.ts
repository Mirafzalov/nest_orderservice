import { Controller } from '@nestjs/common';
import {  MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateOrderDto } from '../dto/order.dto';
import { CreateProductDto } from '../dto/product.dto';
import { PinoLogger } from 'nestjs-pino';
import { MESSAGE_PATTERNS } from 'contracts/message-patterns';

@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly logger: PinoLogger
    ) { }


    @MessagePattern(MESSAGE_PATTERNS.PRODUCT_FINDALL)
    async findAll(@Payload() data: any) {
        this.logger.info(
            {
                pattern: 'PRODUCT_FINDALL',
            },
            'Proccessing all products...')

        return this.productService.findAll()
    }

    @MessagePattern(MESSAGE_PATTERNS.PRODUCT_CREATE)
    async create(
        @Payload() data: CreateProductDto
    ) {
        this.logger.info('Proccessing new product... ')

        try {
            const result = await this.productService.create(data)

            return result

        } catch (error) {

            console.log(error)
        }
    }

    @MessagePattern(MESSAGE_PATTERNS.PRODUCT_FINDONE)
    findOne(@Payload() id: { id: number }) {
        this.logger.info(`Proccessing product with id = ${id.id}...`)

        return this.productService.findOne(id)
    }

    @MessagePattern(MESSAGE_PATTERNS.PRODUCT_UPDATE)
    update(@Payload() data: { id: number, productData: CreateOrderDto }) {
        this.logger.info(`Proccessing update product with id = ${data.id}...`)

        return this.productService.update(data.id, data.productData)
    }

    @MessagePattern(MESSAGE_PATTERNS.PRODUCT_DELETE)
    remove(@Payload() id: number) {
        this.logger.info(`Proccessing delete product with id = ${id}...`)
        return this.productService.remove(id)
    }


}
