import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToProduct1785762637282 implements MigrationInterface {
    name = 'AddIsActiveToProduct1785762637282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD COLUMN "is_active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "is_active"`);
    }

}
