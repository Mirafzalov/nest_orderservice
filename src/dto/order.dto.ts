
import { IsNumber, IsArray, IsPositive, IsString } from 'class-validator'

export class CreateOrderDto {

    @IsPositive()
    @IsNumber()
    totalPrice: number;

    @IsString()
    address: string;


    @IsArray()
    @IsNumber()
    orderProductIds: number[]

}
// {total, quantity, orderProductIds, productId} => {totalPrice: total, address: '', orderProducts: []} => as {totalPrice, address, orderProducts}



