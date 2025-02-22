import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration21740241194471 implements MigrationInterface {
  name = 'Migration21740241194471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "passenger" DROP CONSTRAINT "FK_83a9e00e108f189d9e748da92a1"`,
    );
    await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "ticket_id"`);
    await queryRunner.query(`ALTER TABLE "ticket" ADD "passenger_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_87e2413e9ac12456adabac08457" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_87e2413e9ac12456adabac08457"`,
    );
    await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "passenger_id"`);
    await queryRunner.query(`ALTER TABLE "passenger" ADD "ticket_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "passenger" ADD CONSTRAINT "FK_83a9e00e108f189d9e748da92a1" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
