import { Injectable, NotFoundException, Put } from '@nestjs/common';
import { orders } from './data';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {

    findAll() {
        return orders
    }

    create(data: CreateOrderDto) {
        orders.push(data)
        return orders
    }


    findOne(id: number) {
        const order = orders.find(order => order.id == id);

        if (!order) {
            throw new NotFoundException(`Order with id = ${id} is not found`)
        }

        return order
    }

    update(id: number, data: CreateOrderDto) {
        let order = orders.filter(o => o.id == id)

        if (order.length < 1) {
            throw new NotFoundException(`Order with id = ${id} is not found so it cannot be changed`)
        }

        let result = orders.map(order => order.id == id ? data : order)

        return result
    }


    remove(id: number) {
        const res = orders.find(order => order.id === id);

        if (!res) {
            throw new NotFoundException(`Order with id = ${id} is not found`)
        }


        const data = orders.filter(order => order.id !== id);
        
        return data
    }


}
