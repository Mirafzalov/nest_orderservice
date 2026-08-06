import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/order.dto';
import { Repository } from 'typeorm';
import { Order } from '../db/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async findAll() {
        const orders = await this.orderRepository.find({
            relations: {
                orderProducts: {
                    product: true
                }
            }
        });
        
        if (!orders || orders.length === 0) {
            throw new NotFoundException('No orders found');
        }

        return orders;
    }

    async create(data: CreateOrderDto) {
        const newData = { ...data }

        await this.orderRepository.create(newData)
        return await this.orderRepository.save(newData)

    }


    async findOne(id: number) {
        const order = await this.orderRepository.findOne({ where: { id } })

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`)
        }

        return order;
    }

    async update(id: number, data) {
        const order = await this.orderRepository.findOne({ where: { id } })

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`)
        }

        return this.orderRepository.update(id, data)
    }


    async remove(id: number) {
        const order = await this.orderRepository.findOne({ where: { id } })

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`)
        }

        await this.orderRepository.delete(id)
        
        return { message: 'The order was successfully deleted' }

    }

}
