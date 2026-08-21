
import { IsNumber, IsArray, IsPositive, IsString, IsEnum } from 'class-validator'
    
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



