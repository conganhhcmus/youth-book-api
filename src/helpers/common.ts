import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET_KEY, TOKEN_SECRET_KEY } from '@/config';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
};

export const createToken = (data: string | object) => {
    return jwt.sign(data, TOKEN_SECRET_KEY, { expiresIn: '1h' });
};

export const createRefreshToken = (data: string | object) => {
    return jwt.sign(data, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, TOKEN_SECRET_KEY);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
};
