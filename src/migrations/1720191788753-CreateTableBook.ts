import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableBook1720191788753 implements MigrationInterface {
    name = 'CreateTableBook1720191788753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "stock" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_153910bab5ef6438fb822a0c143" UNIQUE ("code"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
