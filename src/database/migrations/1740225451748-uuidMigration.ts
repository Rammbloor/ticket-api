import { MigrationInterface, QueryRunner } from 'typeorm';

export class UuidMigration1740225451748 implements MigrationInterface {
  name = 'UuidMigration1740225451748';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_ae6cd2db50c8b2dfcad4fe08d72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777"`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "document" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "passengerId"`);
    await queryRunner.query(`ALTER TABLE "document" ADD "passengerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "passenger" DROP CONSTRAINT "FK_2f0446396a794ee8b9e893af741"`,
    );
    await queryRunner.query(
      `ALTER TABLE "passenger" DROP CONSTRAINT "PK_50e940dd2c126adc20205e83fac"`,
    );
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "passenger" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "passenger" ADD CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "ticketId"`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "ticketId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "PK_d9a0835407701eb86f874474b7c"`,
    );
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id")`,
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
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "PK_d9a0835407701eb86f874474b7c"`,
    );
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "ticketId"`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "ticketId" integer`);
    await queryRunner.query(
      `ALTER TABLE "passenger" DROP CONSTRAINT "PK_50e940dd2c126adc20205e83fac"`,
    );
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "passenger" ADD CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "passenger" ADD CONSTRAINT "FK_2f0446396a794ee8b9e893af741" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "passengerId"`);
    await queryRunner.query(`ALTER TABLE "document" ADD "passengerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777"`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "document" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_ae6cd2db50c8b2dfcad4fe08d72" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
