import dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT as string, 10) || 8080;

export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

export const NODE_ENV = process.env.NODE_ENV;

export const ATLAS_URI = process.env.ATLAS_URI.replace('{NODE_ENV}', NODE_ENV);
