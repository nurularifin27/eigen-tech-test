import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMember1720197924111 implements MigrationInterface {
    name = 'CreateTableMember1720197924111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_87dbb39d7c7c430faa5bf1af3bb" UNIQUE ("code"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "member"`);
    }

}
