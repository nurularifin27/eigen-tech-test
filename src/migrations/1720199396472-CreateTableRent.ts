import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRent1720199396472 implements MigrationInterface {
    name = 'CreateTableRent1720199396472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rent" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "rentDate" date NOT NULL, "returnDate" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "memberId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "UQ_0b6b83636afccb4b5eb6084ecce" UNIQUE ("code"), CONSTRAINT "PK_211f726fd8264e82ff7a2b86ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_95b1fab3b761982d278ef523c6e" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_aab2a8573af2dae981e8fe4013a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_aab2a8573af2dae981e8fe4013a"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_95b1fab3b761982d278ef523c6e"`);
        await queryRunner.query(`DROP TABLE "rent"`);
    }

}
