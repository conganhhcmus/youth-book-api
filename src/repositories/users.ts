import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import UserModel from '@/models/users';
import { User } from '@/types/users';

export const getUsers = async (page: number) => {
    const total = await UserModel.countDocuments().exec();
    const users = await UserModel.find()
        .skip(DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE)
        .limit(DEFAULT_PAGE_SIZE);

    return { users, totalPage: Math.ceil(total / DEFAULT_PAGE_SIZE) };
};

export const getUserByUserName = (username: string) => UserModel.findOne({ username });

export const getUserByRefreshToken = (token: string) => UserModel.findOne({ refreshToken: token });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>): Promise<User> => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, { new: true });
