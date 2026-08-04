import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";


@Entity()
export class OrderProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number


    @ManyToOne(() => Order, (order) => order.orderProducts, {
        onDelete: 'CASCADE'
    })

    order: Order;
    

    @ManyToOne(() => Product)
    product: Product
}