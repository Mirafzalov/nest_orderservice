import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'admin',
    password: '123',
    database: 'db',
    synchronize: false,
    entities: ['apps/order_service/src/**/*.entity{.ts,.js}'],

    migrations: ['apps/order_service/src/db/migrations/*.ts']
})