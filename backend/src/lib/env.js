import donenv from 'dotenv';

donenv.config();

export const ENV = {
    PORT: process.env.PORT || 7000,
    DB_URL: process.env.DB_URL,
};