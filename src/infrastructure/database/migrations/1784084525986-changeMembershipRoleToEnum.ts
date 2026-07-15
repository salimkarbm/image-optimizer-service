import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeMembershipRoleToEnum1784084525986 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Add new column as nullable first
    await queryRunner.query(`
      ALTER TABLE "public"."memberships" 
      ADD COLUMN "role_new" character varying
    `);

    // 2. Migrate data from old roles table
    // If your Role table has a `name` or `slug` column that matches SystemRole
    await queryRunner.query(`
      UPDATE "public"."memberships" m
      SET "role_new" = UPPER(r."name")
      FROM "public"."roles" r
      WHERE r."id"::text = m."roleId"::text
    `);

    // If you already deleted roles table or have nulls, fallback to 'MEMBER'
    await queryRunner.query(`
      UPDATE "public"."memberships"
      SET "role_new" = 'MEMBER'
      WHERE "role_new" IS NULL
    `);

    // 3. Now make it NOT NULL
    await queryRunner.query(`
      ALTER TABLE "public"."memberships" 
      ALTER COLUMN "role_new" SET NOT NULL
    `);

    // 4. Drop old FK and column
    await queryRunner.query(`
      ALTER TABLE "public"."memberships" 
      DROP CONSTRAINT IF EXISTS "FK_1564421aeb8beb517219b10d1a7"
    `);

    await queryRunner.query(`
      ALTER TABLE "public"."memberships" 
      DROP COLUMN "roleId"
    `);

    // 5. Rename new column to role
    await queryRunner.query(`
      ALTER TABLE "public"."memberships" 
      RENAME COLUMN "role_new" TO "role"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // simplified down, recreate roleId
    await queryRunner.query(`
      ALTER TABLE "public"."memberships" 
      ADD COLUMN "roleId" uuid
    `);
    await queryRunner.query(`
      ALTER TABLE "public"."memberships" 
      DROP COLUMN "role"
    `);
  }
}
