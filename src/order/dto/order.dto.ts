
import { IsString, IsNumber } from 'class-validator'

export class CreateOrderDto {
    @IsNumber()
    id: number;

    @IsNumber()
    total: number;

    @IsString()
    product: string;

    @IsNumber()
    quantity: number;

    @IsString()
    date: string;

}


