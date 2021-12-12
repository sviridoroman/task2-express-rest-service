import {MigrationInterface, QueryRunner} from "typeorm";

export class mig1639322048451 implements MigrationInterface {
    name = 'mig1639322048451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "directors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "country" character varying NOT NULL, "birthday" character varying NOT NULL, CONSTRAINT "PK_a9ae28f00c93801aa034a2c1773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "films" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "price" integer NOT NULL, "genre" character varying NOT NULL, "year" integer NOT NULL, "directorId" character varying(36), CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "results" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL DEFAULT '', "proceeds" character varying NOT NULL DEFAULT '', "views" character varying NOT NULL DEFAULT '', "filmId" character varying(36), CONSTRAINT "PK_e8f2a9191c61c15b627c117a678" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "results"`);
        await queryRunner.query(`DROP TABLE "films"`);
        await queryRunner.query(`DROP TABLE "directors"`);
    }

}
