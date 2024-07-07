import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnActualReturnAndIsLateOnRent1720201621326 implements MigrationInterface {
    name = 'AddColumnActualReturnAndIsLateOnRent1720201621326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" ADD "actualReturnDate" date`);
        await queryRunner.query(`ALTER TABLE "rent" ADD "isLateReturn" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "rent" ALTER COLUMN "returnDate" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" ALTER COLUMN "returnDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN "isLateReturn"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN "actualReturnDate"`);
    }

}
