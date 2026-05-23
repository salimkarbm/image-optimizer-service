import 'dotenv/config';

export const configuration = () => {
  return {
    APP: {
      port: parseInt(process.env.PORT as string, 10) || 3000,
      env: process.env.APP_ENV || 'development',
      name: process.env.APP_NAME,
      version: process.env.APP_VERSION,
      tagline: process.env.APP_TAGLINE,
      teamName: process.env.TEAM_NAME,
      dashboardUrl: process.env.DASHBOARD_URL,
      frontendUrl: process.env.FRONTEND_URL,
      companyAddress: process.env.COMPANY_ADDRESS,
      unsubscribeUrl: process.env.UNSUBSCRIBE_URL,
      helpUrl: process.env.HELP_URL,
    },
    DATABASE: {
      URI:
        process.env.DATABASE_URI ||
        'postgres://postgres:yourpassword@localhost:5432/image_processor_db',
      URL: process.env.DATABASE_URL,
      DRIVER: process.env.DATABASE_DRIVER as 'postgres',
      HOST: process.env.DATABASE,
      PORT: Number(process.env.DATABASE_PORT),
      USERNAME: process.env.DATABASE_USERNAME,
      PASSWORD: process.env.DATABASE_PASSWORD,
      NAME: process.env.DATABASE_DATABASE,
      SSL: process.env.DATABASE_SSL,
    },
    JWT: {
      secret: process.env.JWT_SECRET as string,
      refreshTokenExpiryInSeconds:
        parseInt(process.env.REFRESH_TOKEN_EXPIRY_IN_DAYS as string, 10) *
          24 *
          60 *
          60 || 1209600, // in seconds
      accessTokenExpiryInSeconds:
        parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY_IN_MINUTES as string, 10) *
          60 || 300, // in seconds
    },
    MAILER: {
      NAME: process.env.EMAIL_NAME || 'gmail',
      HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
      PORT:
        parseInt(process.env.EMAIL_PORT as string, 10) ||
        process.env.EMAIL_PORT ||
        587,
      USERNAME: process.env.EMAIL_USERNAME,
      PASSWORD: process.env.EMAIL_PASSWORD,
      FROM: process.env.EMAIL_FROM || 'noreply@yourapp.com',
    },
    OTP: {
      EXPIRY_TIME: parseInt(process.env.OTP_EXPIRY_TIME as string, 10) || 10, // in minutes
      MAX_ATTEMPTS: parseInt(process.env.OTP_MAX_ATTEMPTS as string, 10) || 3,
      GENERATION_INTERVAL:
        parseInt(process.env.OTP_GENERATION_INTERVAL as string, 10) || 1, // in minutes
      ENCRYPTION_KEY: process.env.OTP_ENCRYPTION_KEY || 'your-encryption-key',
    },
    REDIS: {
      URL: (process.env.REDIS_URL as string) || 'redis://localhost:6379',
      port: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
      host: process.env.REDIS_HOST || 'localhost',
      db: parseInt(process.env.REDIS_DB as string, 10) || 0,
      password: process.env.REDIS_PASSWORD || undefined,
      cacheTTL: parseInt(process.env.REDIS_CACHE_TTL as string, 10) || 600, // in seconds
    },
  };
};

export const ENVIRONMENT = configuration();
