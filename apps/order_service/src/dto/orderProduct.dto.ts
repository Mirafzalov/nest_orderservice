import { IsNumber, IsPositive } from "class-validator";

export class CreateOrderProductDto {

    @IsNumber()
    quantity: number;

    @IsNumber()
    orderId: number;

    @IsNumber()
    productId: number;
}