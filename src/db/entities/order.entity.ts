import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    totalPrice: number;

    @Column('text')
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date


    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
        cascade: true
    })

    orderProducts: OrderProduct[];


}


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