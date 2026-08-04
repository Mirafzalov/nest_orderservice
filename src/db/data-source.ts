import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'admin',
    password: '123',
    database: 'db',
    synchronize: false,
    entities: ['src/**/*.entity{.ts,.js}'],

    migrations: ['src/db/migrations/*.ts']
})