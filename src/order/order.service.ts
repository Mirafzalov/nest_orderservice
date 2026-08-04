import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/order.dto';
import { Repository } from 'typeorm';
import { Order } from 'src/db/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async findAll() {
        return await this.orderRepository.find({
            relations: {
                orderProducts: {
                    product: true
                }
            }
        });
    }

    async create(data: CreateOrderDto) {
        const newData = { ...data }

        return await this.orderRepository.create(newData)
    }


    async findOne(id: number) {
        const products = await this.orderRepository.find()
        return products.find(product => product.id === id)
    }

    async update(id: number, data) {
        return this.orderRepository.update(id, data)
    }


    async remove(id: number) {
        // const products = await this.orderRepository.remove(+id)


    }


}

