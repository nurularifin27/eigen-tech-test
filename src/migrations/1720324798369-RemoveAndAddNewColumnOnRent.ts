import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAndAddNewColumnOnRent1720324798369 implements MigrationInterface {
    name = 'RemoveAndAddNewColumnOnRent1720324798369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN "actualReturnDate"`);
        await queryRunner.query(`ALTER TABLE "rent" ADD "isLate" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."rent_status_enum" AS ENUM('borrowed', 'returned')`);
        await queryRunner.query(`ALTER TABLE "rent" ADD "status" "public"."rent_status_enum" NOT NULL DEFAULT 'borrowed'`);
        await queryRunner.query(`ALTER TABLE "rent" ALTER COLUMN "rentDate" SET DEFAULT ('now'::text)::date`);
        await queryRunner.query(`ALTER TABLE "rent" ALTER COLUMN "returnDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" ALTER COLUMN "returnDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rent" ALTER COLUMN "rentDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."rent_status_enum"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN "isLate"`);
        await queryRunner.query(`ALTER TABLE "rent" ADD "actualReturnDate" date`);
    }

}
