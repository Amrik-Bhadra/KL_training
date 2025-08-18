import 'dotenv/config';

export const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT || 8000),
    MONGO_URI: process.env.MONGO_URI!,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || '15m',
    REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL || '7d',
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || 'localhost',
    S3_REGION: process.env.S3_REGION!,
    S3_BUCKET: process.env.S3_BUCKET!,
}