import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumnIsLateReturnOnRent1720243794989 implements MigrationInterface {
    name = 'RemoveColumnIsLateReturnOnRent1720243794989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN "isLateReturn"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" ADD "isLateReturn" boolean NOT NULL DEFAULT false`);
    }

}
