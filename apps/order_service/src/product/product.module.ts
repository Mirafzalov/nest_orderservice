import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Product } from '../../../payment-worker/src/db/entities/product.entity';
import { ProductController } from './product.controller';
import { RabbitMQModule } from '../rabbit/rabbitmq.module';




@Module({
    imports: [
        RabbitMQModule.register({
            name: 'RABBIT_PRODUCT',
            queue: 'product_queue'
        })
    ],
    controllers: [ProductController],
    providers: []

})
export class ProductModule { }
