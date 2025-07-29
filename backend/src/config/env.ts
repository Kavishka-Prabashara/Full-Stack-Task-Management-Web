// backend/src/config/env.ts
import dotenv from 'dotenv';
import path from 'path';

// Load .env file from root of backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
    PORT: process.env.PORT || '5000',
    JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
    DATABASE_URL: process.env.DATABASE_URL || '',
};
