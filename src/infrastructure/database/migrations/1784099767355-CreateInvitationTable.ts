// 1784096091584-CreateInvitationTable.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvitationTable1784096091584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."organization_invitations_role_enum" AS ENUM('OWNER', 'ADMIN', 'EDITOR', 'VIEWER')
        `);

    await queryRunner.query(`
            CREATE TABLE "public"."organization_invitations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "rowVersion" integer NOT NULL DEFAULT 1,
                "organizationId" uuid NOT NULL,
                "email" varchar NOT NULL,
                "role" "public"."organization_invitations_role_enum" NOT NULL,
                "token" varchar NOT NULL,
                "invitedBy" uuid NOT NULL,
                "expiresAt" TIMESTAMPTZ NOT NULL,
                "acceptedAt" TIMESTAMPTZ,
                CONSTRAINT "UQ_invitation_token" UNIQUE ("token"),
                CONSTRAINT "PK_organization_invitations" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."organization_invitations"`);
    await queryRunner.query(
      `DROP TYPE "public"."organization_invitations_role_enum"`,
    );
  }
}
