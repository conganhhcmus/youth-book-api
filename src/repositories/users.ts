import UserModel from '@/models/users';
import { User } from '@/types/users';

export const getUsers = () => UserModel.find();

export const getUserByUserName = (username: string) => UserModel.findOne({ username });

export const getUserByRefreshToken = (token: string) => UserModel.findOne({ refreshToken: token });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>): Promise<User> => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, { new: true });
