import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/constants/common';
import { INVALID_TOKEN, USER_HAVE_NOT_PERMISSION } from '@/constants/error';
import { Roles } from '@/constants/roles';
import * as helpers from '@/helpers/common';
import { ForbiddenError } from '@/types/error';
import { UserJwtPayload } from '@/types/users';
import { NextFunction, Response, Request } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const payload = req['identity'] as UserJwtPayload;

    if (payload.role !== Roles.Admin) {
        throw new ForbiddenError(USER_HAVE_NOT_PERMISSION);
    }
    next();
};

export const isAdminOrOwner = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req['identity'] as UserJwtPayload;

    if (payload.role !== Roles.Admin && payload._id !== id) {
        throw new ForbiddenError(USER_HAVE_NOT_PERMISSION);
    }
    next();
};

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[TOKEN_KEY] as string;
    if (!token) {
        throw new ForbiddenError(INVALID_TOKEN);
    }
    const payload = helpers.verifyToken(token) as UserJwtPayload;
    req['identity'] = payload;
    next();
};

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY] as string;
    if (!refreshToken) {
        throw new ForbiddenError(INVALID_TOKEN);
    }
    const payload = helpers.verifyRefreshToken(refreshToken) as UserJwtPayload;
    req['identity'] = payload;
    next();
};
