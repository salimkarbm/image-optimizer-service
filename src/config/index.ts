import 'dotenv/config';

export const configuration = () => {
  return {
    APP: {
      port: parseInt(process.env.PORT as string, 10) || 3000,
      env: process.env.APP_ENV || 'development',
      name: process.env.APP_NAME,
      version: process.env.APP_VERSION,
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'your-encryption-key',
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
      secret: process.env.JWT_SECRET,
      accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '1d',
      refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '14d',
      expiresIn: process.env.JWT_EXPIRY || '30s',
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
    },
  };
};

export const ENV_CONFIG = configuration();
