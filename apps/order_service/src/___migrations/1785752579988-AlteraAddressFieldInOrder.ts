import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteraAddressFieldInOrder1785752579988 implements MigrationInterface {
    name = 'AlteraAddressFieldInOrder1785752579988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "totalPrice" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "totalPrice" TYPE numeric`);
    }

}
