import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'admin',
    password: '123',
    database: 'db',

    entities: [
        'src/**/*.entity.ts',
        'dist/**/*.entity.js',
    ],
    migrations: [
        'src/migrations/*.ts',
        'dist/migrations/*.js',
    ]
})