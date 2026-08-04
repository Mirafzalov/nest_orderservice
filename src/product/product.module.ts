import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/db/entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Category } from 'src/db/entities/category.entity';




@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [ProductController],
    providers: [ProductService]

})
export class ProductModule { }
