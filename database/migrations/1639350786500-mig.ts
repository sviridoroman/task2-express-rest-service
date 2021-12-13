import {MigrationInterface, QueryRunner} from "typeorm";

export class mig1639350786500 implements MigrationInterface {
    name = 'mig1639350786500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT '', "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "country" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "proceeds" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "views" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "views" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "proceeds" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "results" ALTER COLUMN "country" SET DEFAULT ''`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
