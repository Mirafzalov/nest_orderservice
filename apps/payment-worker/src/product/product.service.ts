import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../db/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async findAll() {
        return await this.productRepository.find()
    }

    async create(data) {
        const product = this.productRepository.create(data)
        return await this.productRepository.save(product)
    }

    async findOne(id: {id : number}) {
        const product = await this.productRepository.findOneBy(id)

        if (!product) {
            throw new NotFoundException('Product with that id is not found')
        }

        return product
    }

    async update(id, data) {

        const product = await this.productRepository.findOneBy({id})

        if (!product) {
            throw new NotFoundException('Product with that id is not found')
        }
        await this.productRepository.update(id, data)
        
        return await this.productRepository.findOneBy({id})
    }


    async remove(id) {
        const product = await this.productRepository.findOne({ where: { id } })

        if (!product) {
            throw new NotFoundException('Product with that id is not found')
        }

        await this.productRepository.delete(id)
        
        return { message: 'The product was succesfully deleted' }

    }
}
