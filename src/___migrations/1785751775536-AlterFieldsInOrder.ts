import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterFieldsInOrder1785751775536 implements MigrationInterface {
    name = 'AlterFieldsInOrder1785751775536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalPrice" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalPrice" integer NOT NULL`);
    }

}
