import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1781598723060 implements MigrationInterface {
  name = 'Users1781598723060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "otherName" character varying, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'other', "dateOfBirth" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "emailVerifiedAt" TIMESTAMP WITH TIME ZONE, "suspensionReason" character varying, "lastLoginAt" TIMESTAMP WITH TIME ZONE, "loginAttempts" jsonb, "status" "public"."users_status_enum" NOT NULL DEFAULT 'pending_verification', "avatar" character varying, "termsVersion" character varying, "termsAcceptedAt" TIMESTAMP WITH TIME ZONE, "termsAcceptedIp" character varying, "deletedAt" TIMESTAMP, "lockUntil" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."rowVersion" IS 'System‑managed optimistic‑locking column'; COMMENT ON COLUMN "users"."email" IS 'User email address'; COMMENT ON COLUMN "users"."password" IS 'User password'`,
    );
    await queryRunner.query(
      `CREATE TABLE "audit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "organizationId" uuid NOT NULL, "userId" uuid NOT NULL, "action" "public"."audit_logs_action_enum" NOT NULL, "module" "public"."audit_logs_module_enum" NOT NULL, "metadata" jsonb, "ipAddress" character varying, "userEmailSnapshot" character varying, "userRoleSnapshot" character varying, "userAgent" character varying, CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id")); COMMENT ON COLUMN "audit_logs"."rowVersion" IS 'System‑managed optimistic‑locking column'`,
    );
    await queryRunner.query(
      `CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "type" character varying NOT NULL, "code" text NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "identifier" character varying NOT NULL, "resendCount" integer NOT NULL DEFAULT '0', "nextResendAt" TIMESTAMP WITH TIME ZONE, "attempts" integer NOT NULL DEFAULT '0', "isUsed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id")); COMMENT ON COLUMN "otp"."rowVersion" IS 'System‑managed optimistic‑locking column'; COMMENT ON COLUMN "otp"."type" IS 'Type of OTP, either for phone number verification or email verification'; COMMENT ON COLUMN "otp"."code" IS 'The OTP code, stored as a hashed value for security'; COMMENT ON COLUMN "otp"."expiredAt" IS 'The timestamp when the OTP expires'; COMMENT ON COLUMN "otp"."identifier" IS 'The identifier for the user or entity associated with the OTP'; COMMENT ON COLUMN "otp"."resendCount" IS 'Number of times the OTP has been resent'; COMMENT ON COLUMN "otp"."nextResendAt" IS 'The timestamp when the next OTP can be resent'; COMMENT ON COLUMN "otp"."attempts" IS 'Number of wrong OTP entry attempts'; COMMENT ON COLUMN "otp"."isUsed" IS 'Indicates if the OTP has been used'`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "userId" uuid NOT NULL, "refreshToken" text NOT NULL, "userAgent" text NOT NULL, "ipAddress" text NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "revokedAt" TIMESTAMP WITH TIME ZONE, "deviceName" text NOT NULL, "lastSeenAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")); COMMENT ON COLUMN "session"."rowVersion" IS 'System‑managed optimistic‑locking column'`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "isSystem" boolean NOT NULL DEFAULT false, "isDefault" boolean NOT NULL DEFAULT false, "isSuperAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_a87cf0659c3ac379b339acf36a2" UNIQUE ("key"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")); COMMENT ON COLUMN "roles"."rowVersion" IS 'System‑managed optimistic‑locking column'`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_963693341bd612aa01ddf3a4b68" UNIQUE ("slug"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id")); COMMENT ON COLUMN "organizations"."rowVersion" IS 'System‑managed optimistic‑locking column'`,
    );
    await queryRunner.query(
      `CREATE TABLE "memberships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "userId" uuid NOT NULL, "organizationId" uuid NOT NULL, "roleId" uuid, CONSTRAINT "UQ_64893eb3c6fcaeaaee71a4d0ae1" UNIQUE ("userId", "organizationId"), CONSTRAINT "PK_25d28bd932097a9e90495ede7b4" PRIMARY KEY ("id")); COMMENT ON COLUMN "memberships"."rowVersion" IS 'System‑managed optimistic‑locking column'`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "key" character varying NOT NULL, "action" character varying NOT NULL, "resource" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_017943867ed5ceef9c03edd9745" UNIQUE ("key"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")); COMMENT ON COLUMN "permissions"."rowVersion" IS 'System‑managed optimistic‑locking column'`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rowVersion" integer NOT NULL, "roleId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id")); COMMENT ON COLUMN "role_permissions"."rowVersion" IS 'System‑managed optimistic‑locking column'`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_2d031e6155834882f54dcd6b4f5" FOREIGN KEY ("organizationId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_cfa83f61e4d27a87fcae1e025ab" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_187d573e43b2c2aa3960df20b78" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_98d23786d647f0ccf477b3b2867" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_1564421aeb8beb517219b10d1a7" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" DROP CONSTRAINT "FK_1564421aeb8beb517219b10d1a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" DROP CONSTRAINT "FK_98d23786d647f0ccf477b3b2867"`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" DROP CONSTRAINT "FK_187d573e43b2c2aa3960df20b78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_logs" DROP CONSTRAINT "FK_cfa83f61e4d27a87fcae1e025ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_logs" DROP CONSTRAINT "FK_2d031e6155834882f54dcd6b4f5"`,
    );
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "memberships"`);
    await queryRunner.query(`DROP TABLE "organizations"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "otp"`);
    await queryRunner.query(`DROP TABLE "audit_logs"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
