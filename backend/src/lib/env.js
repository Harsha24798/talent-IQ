import donenv from 'dotenv';

donenv.config({ quiet: true });

export const ENV = {
    PORT: process.env.PORT || 7000,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
};