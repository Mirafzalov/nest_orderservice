import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProduct } from "./orderProduct.entity";


@Entity('order')
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        scale: 2
    })
    totalPrice: number;

    @Column({
        type: 'text',
        nullable: true
    })
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

