import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/order.dto';

@Injectable()
export class DataService {

    private db_orders = [
        {
            id: 1,
            total: 1500,
            product: 'Laptop',
            quantity: 1,
            date: '2026-06-06'
        },
        {
            id: 2,
            total: 120,
            product: 'Grocery products',
            quantity: 10,
            date: '2026-07-10'
        },
        {
            id: 3,
            total: 50,
            product: 'Pizza',
            quantity: 2,
            date: '2026-06-15'
        }, {
            id: 4,
            total: 500,
            product: 'Playstation',
            quantity: 1,
            date: '2026-07-24'
        },
    ]


    findAll() {
        return this.db_orders
    }

    create(data: CreateOrderDto) {
        this.db_orders.push(data)
        return this.db_orders
    }


    findOne(id: number) {
        const order = this.db_orders.find(order => order.id == id);

        if (!order) {
            throw new NotFoundException(`Order with id = ${id} is not found`)
        }

        return order
    }

    update(id: number, data: CreateOrderDto) {
        let order = this.db_orders.filter(o => o.id == id)

        if (order.length < 1) {
            throw new NotFoundException(`Order with id = ${id} is not found so it cannot be changed`)
        }

        let result = this.db_orders.map(order => order.id == id ? data : order)

        return result
    }


    remove(id: number) {
        const res = this.db_orders.find(order => order.id === id);

        if (!res) {
            throw new NotFoundException(`Order with id = ${id} is not found`)
        }


        const data = this.db_orders.filter(order => order.id !== id);
        
        return data
    }

}


