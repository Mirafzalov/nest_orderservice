import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProduct } from "./orderProduct.entity";
import { OrderStatus } from "../enum/orders-status";
import { User } from "./user.entity";


@Entity('order')
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: 0
    })
    totalPrice: number;

    @Column({
        type: 'text',
        nullable: true
    })
    address: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: 'pending'
    })
    status: string


    @Column()
    userId: number;

    @ManyToOne(() => User)

    @JoinColumn({ name: 'userId' })
    user: User



    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date



    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
        cascade: true
    })

    orderProducts: OrderProduct[];





}

