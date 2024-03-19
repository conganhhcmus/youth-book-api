import { INVALID_PARAMETERS, USER_NOT_FOUND } from '@/constants/error';
import * as userRepository from '@/repositories/users';
import { BadRequestError } from '@/types/error';
import { User } from '@/types/users';

export const getAllUsers = async (page: number, q: string, type: string) => {
    return await userRepository.getUsers(page, q, type);
};

export const getUserById = async (id: string) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new BadRequestError(USER_NOT_FOUND);
    }
    return user;
};

export const updateUserById = async (id: string, data: User) => {
    const { password, refreshToken, username, ...newData } = data;
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new BadRequestError(USER_NOT_FOUND);
    }
    if (user.username !== username) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }

    return await userRepository.updateUserById(id, newData);
};

export const deleteUserById = async (id: string) => {
    const user = await getUserById(id);
    if (!user) {
        throw new BadRequestError(USER_NOT_FOUND);
    }

    return await userRepository.deleteUserById(id);
};

export const updateWalletById = async (id: string, amount: number) => {
    return await userRepository.updateWalletById(id, amount);
};

export const updateAvatarById = async (id: string, avatarUrl: string, avatarId: string) => {
    return await userRepository.updateAvatarById(id, avatarUrl, avatarId);
};

export const updateStatusById = async (id: string) => {
    return await userRepository.updateStatusById(id);
};
