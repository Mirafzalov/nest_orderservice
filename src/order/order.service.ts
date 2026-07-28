import { Injectable, NotFoundException, Put } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { DataService } from '../db/data.service';

@Injectable()
export class OrderService {
    constructor(private dataservice: DataService){}

    findAll() {
        return this.dataservice.findAll()
    }

    create(data: CreateOrderDto) {
        return this.dataservice.create(data)
    }


    findOne(id: number) {
        return this.dataservice.findOne(id)
    }

    update(id: number, data: CreateOrderDto) {
        return this.dataservice.update(id,data)
    }


    remove(id: number) {
        return this.dataservice.remove(id)
    }


}
