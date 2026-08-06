import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',        
    port: 5432,      
    username: 'admin',
    password: '123',
    database: 'db',
    // entities: ['src/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,

  }),
    OrderModule,
    ProductModule,
    UserModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
