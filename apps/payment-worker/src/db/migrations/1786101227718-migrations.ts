import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1786101227718 implements MigrationInterface {
    name = 'Migrations1786101227718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalPrice" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "userId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "userId" SET DEFAULT '11'`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalPrice" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
