import { User, UserJwtPayload } from '@/types/users';
import { BadRequestError, UnauthorizedError } from '@/types/error';
import { createUser, getUserByUserName } from '@/repositories/users';
import { comparePassword, createRefreshToken, createToken, hashPassword } from '@/helpers/auth';
import { INVALID_LOGIN, INVALID_PARAMETERS, INVALID_PASSWORD, INVALID_REFRESH_TOKEN, USER_IS_EXISTING, USER_NOT_FOUND } from '@/constants/error';
import moment from 'moment';

export const register = async (data: User): Promise<User> => {
    if (!data.password || !data.username) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }
    const existingUser = await getUserByUserName(data.username);

    if (existingUser) {
        throw new BadRequestError(USER_IS_EXISTING);
    }

    const user = await createUser({
        email: data.email,
        username: data.username,
        fullName: data.fullName,
        role: data.role,
        password: await hashPassword(data.password),
        createTime: moment().utc().toDate(),
    });

    return user;
};

export const login = async (data: User): Promise<{ token: string; refreshToken: string }> => {
    if (!data.password || !data.username) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }
    const user = await getUserByUserName(data.username).select('+password');

    if (!user || !user.isActive) {
        throw new BadRequestError(USER_NOT_FOUND);
    }
    const isCorrect = await comparePassword(data.password, user.password);
    if (!isCorrect) {
        throw new UnauthorizedError(INVALID_LOGIN);
    }
    const { password, ...payload } = user.toObject();
    const token = createToken(payload);
    const refreshToken = createRefreshToken(payload);
    user.refreshToken = refreshToken;
    user.save();

    return { token, refreshToken };
};

export const resetToken = async (payload: UserJwtPayload, refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
    const user = await getUserByUserName(payload.username).select('+refreshToken');

    if (!user) {
        throw new BadRequestError(USER_NOT_FOUND);
    }
    if (refreshToken !== user.refreshToken) {
        throw new UnauthorizedError(INVALID_REFRESH_TOKEN);
    }

    const { password, ...payloadNew } = user.toObject();
    const token = createToken(payloadNew);

    return { token, refreshToken };
};

export const resetPassword = async (data: User, newPassword: string): Promise<{ token: string; refreshToken: string }> => {
    if (!data.password || !data.username || !newPassword) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }
    const user = await getUserByUserName(data.username).select('+password');
    if (!user) {
        throw new BadRequestError(USER_NOT_FOUND);
    }

    const isCorrect = await comparePassword(data.password, user.password);
    if (!isCorrect) {
        throw new UnauthorizedError(INVALID_PASSWORD);
    }

    const { password, ...payload } = user.toObject();
    const token = createToken(payload);
    const refreshToken = createRefreshToken(payload);
    user.refreshToken = refreshToken;
    user.password = await hashPassword(newPassword);
    user.save();

    return { token, refreshToken };
};
