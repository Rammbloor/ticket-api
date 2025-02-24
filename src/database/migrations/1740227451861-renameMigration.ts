import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameMigration1740227451861 implements MigrationInterface {
  name = 'RenameMigration1740227451861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "UQ_074914b455c1fb554cd55ee2029"`,
    );
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "orderNumber"`);
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "departureDate"`);
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "arrivalDate"`);
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "bookingDate"`);
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "middleName"`);
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "documentType"`);
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "UQ_c4510256a30d1f49d8bd3b103e9"`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "documentNumber"`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "order_number" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "UQ_59e7d78f044f0b28b239ab17bad" UNIQUE ("order_number")`,
    );
    await queryRunner.query(`ALTER TABLE "ticket" ADD "departure_date" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "arrival_date" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "booking_date" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "last_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "first_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "middle_name" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "document" ADD "document_type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "document_number" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "UQ_599faf678324c5716c9e1ae6dea" UNIQUE ("document_number")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "UQ_599faf678324c5716c9e1ae6dea"`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "document_number"`);
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "document_type"`);
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "middle_name"`);
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "booking_date"`);
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "arrival_date"`);
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "departure_date"`);
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "UQ_59e7d78f044f0b28b239ab17bad"`,
    );
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "order_number"`);
    await queryRunner.query(
      `ALTER TABLE "document" ADD "documentNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "UQ_c4510256a30d1f49d8bd3b103e9" UNIQUE ("documentNumber")`,
    );
    await queryRunner.query(`ALTER TABLE "document" ADD "documentType" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "middleName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "firstName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "lastName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "bookingDate" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "arrivalDate" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "departureDate" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "orderNumber" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "UQ_074914b455c1fb554cd55ee2029" UNIQUE ("orderNumber")`,
    );
  }
}
