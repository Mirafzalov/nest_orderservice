import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1785498926533 implements MigrationInterface {
    name = 'Migrations1785498926533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL`);
    }

}
