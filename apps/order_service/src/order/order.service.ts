import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/order.dto';
import { Repository } from 'typeorm';
import { Order } from '../db/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { response } from 'express';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @Inject('ORDER_SERVICE')
        private readonly client: ClientProxy

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

        const createOrder = this.orderRepository.create(newData)
        const order = await this.orderRepository.save(createOrder)


        const payment = await firstValueFrom(this.client.send('created.order', {
            id: order.id,
            totalPrice: order.totalPrice,
            address: order.address
        }))

        const {id, status} = payment

        await this.orderRepository.update(id, { status: status || 'failed' })


        return this.orderRepository.findOneBy({ id })


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

        await this.orderRepository.update(id, data)

        return this.orderRepository.findOneBy({ id })
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
