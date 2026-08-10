
import { IsNumber, IsArray, IsPositive, IsString, IsEnum } from 'class-validator'
import { OrderStatus } from '../db/enum/orders-status';

export class CreateOrderDto {

    @IsPositive()
    @IsNumber()
    totalPrice: number;

    @IsString()
    address: string;


    @IsNumber()
    userId: number


    // @IsArray()
    // @IsNumber()
    // orderProductIds: number[]

}



