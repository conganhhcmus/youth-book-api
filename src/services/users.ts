import { INVALID_PARAMETERS, USER_NOT_FOUND } from '@/constants/error';
import { deleteUserById, getUserById, getUsers, updateUserById } from '@/repositories/users';
import { BadRequestError } from '@/types/error';
import { User } from '@/types/users';

export const getAllUsers = async (page: number) => {
    return await getUsers(page);
};

export const getUserInfoById = async (id: string) => {
    const user = await getUserById(id);
    if (!user) {
        throw new BadRequestError(USER_NOT_FOUND);
    }
    return user;
};

export const updateUserInfoById = async (id: string, data: User) => {
    const { password, refreshToken, username, ...newData } = data;
    const user = await getUserById(id);
    if (!user) {
        throw new BadRequestError(USER_NOT_FOUND);
    }
    if (user.username !== username) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }

    return await updateUserById(id, newData);
};

export const deleteUserInfoById = async (id: string) => {
    const user = await getUserById(id);
    if (!user) {
        throw new BadRequestError(USER_NOT_FOUND);
    }

    return await deleteUserById(id);
};
