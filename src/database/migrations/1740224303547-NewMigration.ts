import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1740224303547 implements MigrationInterface {
  name = 'NewMigration1740224303547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "document" ("id" SERIAL NOT NULL, "documentType" character varying NOT NULL, "documentNumber" character varying NOT NULL, "passengerId" integer, CONSTRAINT "UQ_c4510256a30d1f49d8bd3b103e9" UNIQUE ("documentNumber"), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "middleName" character varying NOT NULL, "ticketId" integer, CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "departure" character varying NOT NULL, "destination" character varying NOT NULL, "orderNumber" character varying NOT NULL, "provider" character varying NOT NULL, "departureDate" TIMESTAMP NOT NULL, "arrivalDate" TIMESTAMP NOT NULL, "bookingDate" TIMESTAMP NOT NULL, CONSTRAINT "UQ_074914b455c1fb554cd55ee2029" UNIQUE ("orderNumber"), CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_ae6cd2db50c8b2dfcad4fe08d72" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "passenger" ADD CONSTRAINT "FK_2f0446396a794ee8b9e893af741" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "passenger" DROP CONSTRAINT "FK_2f0446396a794ee8b9e893af741"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_ae6cd2db50c8b2dfcad4fe08d72"`,
    );
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TABLE "passenger"`);
    await queryRunner.query(`DROP TABLE "document"`);
  }
}
