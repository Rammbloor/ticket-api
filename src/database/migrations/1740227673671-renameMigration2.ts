import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameMigration21740227673671 implements MigrationInterface {
  name = 'RenameMigration21740227673671';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "passenger" DROP CONSTRAINT "FK_2f0446396a794ee8b9e893af741"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_ae6cd2db50c8b2dfcad4fe08d72"`,
    );
    await queryRunner.query(`ALTER TABLE "passenger" RENAME COLUMN "ticketId" TO "ticket_id"`);
    await queryRunner.query(`ALTER TABLE "document" RENAME COLUMN "passengerId" TO "passenger_id"`);
    await queryRunner.query(
      `ALTER TABLE "passenger" ADD CONSTRAINT "FK_83a9e00e108f189d9e748da92a1" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_84cd00e2f481b32bcd5dfe1cac2" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_84cd00e2f481b32bcd5dfe1cac2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "passenger" DROP CONSTRAINT "FK_83a9e00e108f189d9e748da92a1"`,
    );
    await queryRunner.query(`ALTER TABLE "document" RENAME COLUMN "passenger_id" TO "passengerId"`);
    await queryRunner.query(`ALTER TABLE "passenger" RENAME COLUMN "ticket_id" TO "ticketId"`);
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_ae6cd2db50c8b2dfcad4fe08d72" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "passenger" ADD CONSTRAINT "FK_2f0446396a794ee8b9e893af741" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
