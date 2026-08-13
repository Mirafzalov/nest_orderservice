import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColorToProduct1785503980905 implements MigrationInterface {
    name = 'AddColorToProduct1785503980905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "color" character varying NOT NULL DEFAULT 'Белый'`);
        await queryRunner.query(`ALTER TABLE "product2" AL TER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "color"`);
    }

}
