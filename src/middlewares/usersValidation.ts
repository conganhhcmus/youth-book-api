import { INVALID_PARAMETERS, USER_HAVE_NOT_PERMISSION } from '@/constants/error';
import { Roles } from '@/constants/roles';
import { BadRequestError, ForbiddenError } from '@/types/error';
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
    const { id: userId } = req.params;
    const payload = req['identity'] as UserJwtPayload;

    if (!userId) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }
    if (payload.role !== Roles.Admin && payload._id !== userId) {
        throw new ForbiddenError(USER_HAVE_NOT_PERMISSION);
    }
    next();
};
