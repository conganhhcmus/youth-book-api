import { Request, Response } from 'express';
import * as auth from '@/services/auth';
import { User, UserJwtPayload } from '@/types/users';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/constants/common';

export const register = async (req: Request, res: Response) => {
    const data: User = req.body;

    const result = await auth.register(data);

    return res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
    const data: User = req.body;
    const result = await auth.login(data);
    // res.cookie(TOKEN_KEY, result.token);
    // res.cookie(REFRESH_TOKEN_KEY, result.refreshToken);
    return res.status(200).json(result);
};

export const resetToken = async (req: Request, res: Response) => {
    const payload = req['identity'] as UserJwtPayload;
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY] as string;
    const result = await auth.resetToken(payload, refreshToken);
    // res.cookie(TOKEN_KEY, result.token);
    // res.cookie(REFRESH_TOKEN_KEY, result.refreshToken);
    return res.status(200).json(result.token);
};

export const resetPassword = async (req: Request, res: Response) => {
    const data: User = req.body;
    const newPassword = req.body.newPassword;

    const result = await auth.resetPassword(data, newPassword);
    // res.cookie(TOKEN_KEY, result.token);
    // res.cookie(REFRESH_TOKEN_KEY, result.refreshToken);
    return res.status(200).json(result);
};
