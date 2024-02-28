import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/constants/auth';
import { INVALID_TOKEN } from '@/constants/error';
import * as helpers from '@/helpers/common';
import { ForbiddenError } from '@/types/error';
import { UserJwtPayload } from '@/types/users';
import { NextFunction, Response, Request } from 'express';

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.cookies[TOKEN_KEY] || req.headers[TOKEN_KEY]) as string;
    if (!token) {
        throw new ForbiddenError(INVALID_TOKEN);
    }
    const payload = helpers.verifyToken(token) as UserJwtPayload;
    req['identity'] = payload;
    next();
};

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = (req.cookies[REFRESH_TOKEN_KEY] || req.headers[REFRESH_TOKEN_KEY]) as string;
    if (!refreshToken) {
        throw new ForbiddenError(INVALID_TOKEN);
    }
    const payload = helpers.verifyRefreshToken(refreshToken) as UserJwtPayload;
    req['identity'] = payload;
    next();
};
