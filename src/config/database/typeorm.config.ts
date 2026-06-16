import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import { ENVIRONMENT } from '../environment';
import { AuditLog } from '../../modules/v1/audit/entities/audit.entity';
import User from '../../modules/v1/users/entities/user.entity';
import { join } from 'path';
import OTP from '../../modules/v1/users/entities/otp.entity';
import Session from '../../modules/v1/users/entities/session.entity';
import { Role } from '../../modules/v1/roles/entities/roles.entity';
import { Organization } from '../../modules/v1/organization/entities/organization.entity';
import { Membership } from '../../modules/v1/membership/entities/members.entity';
import { RolePermission } from '../../modules/v1/permissions/entities/role-permissions.entity';
import { Permission } from '../../modules/v1/permissions/entities/permission.entity';

dotenv.config();
export const makeDataSource = (): DataSource => {
  const isProduction = ENVIRONMENT.APP.env === 'production';
  const isDevelopment = ENVIRONMENT.APP.env === 'development';

  const common: Partial<DataSourceOptions> = {
    type: 'postgres',
    schema: 'public',
    entities: [
      User,
      AuditLog,
      OTP,
      Session,
      Role,
      Organization,
      Membership,
      RolePermission,
      Permission,
    ],
    migrations: [
      join(
        __dirname,
        '..',
        '..',
        'infrastructure',
        'database',
        'migrations',
        '*.{ts,js}',
      ),
    ],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    synchronize: false,
    logging: isDevelopment ? (['query', 'error', 'schema'] as const) : false,
  };

  if (process.env.DATABASE_URL) {
    const options: DataSourceOptions = {
      ...common,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // for neon heroku, otherwise set to isProduction // Tell pg to use SSL
      extra: {
        // ssl: isProduction
        //   ? {
        //       rejectUnauthorized: true, // This = verify-full
        //       // ca: fs.readFileSync('/path/to/ca.pem').toString(), // if you have CA cert
        //       // ca: process.env.DATABASE_SSL_CA
        //       //   ? Buffer.from(process.env.DATABASE_SSL_CA, 'base64').toString('utf-8')
        //       //   : undefined,
        //     }
        //   : false, // This = disable
        connectionTimeoutMillis: 30000,
        max: 20,
        idleTimeoutMillis: 30000,
        keepAlive: true,
        // query_timeout: 10000,
        // statement_timeout: 10000,
      },
    };
    return new DataSource(options);
  }

  const options: DataSourceOptions = {
    ...common,
    type: 'postgres',
    host: ENVIRONMENT.DATABASE.HOST,
    port: ENVIRONMENT.DATABASE.PORT,
    username: ENVIRONMENT.DATABASE.USERNAME,
    password: ENVIRONMENT.DATABASE.PASSWORD,
    database: ENVIRONMENT.DATABASE.NAME,
    ssl: isProduction,
    extra: {
      ssl: isProduction ? { rejectUnauthorized: true } : false,
      connectionTimeoutMillis: 30000,
      // query_timeout: 10000,
      // statement_timeout: 10000,
      max: 20,
      idleTimeoutMillis: 30000,
      keepAlive: true,
    },
  };
  return new DataSource(options);
};
export const AppDataSource = makeDataSource();
