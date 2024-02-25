import { deleteUserInfoById, getAllUsers, getUserInfoById, updateUserInfoById } from '@/services/users';
import { User } from '@/types/users';
import { Request, Response } from 'express';

export const getAllUserInfo = async (req: Request, res: Response) => {
    const result = await getAllUsers();
    return res.status(200).json(result);
};

export const getUserInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getUserInfoById(id);
    return res.status(200).json(result);
};

export const updateUserInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: User = req.body;
    const result = await updateUserInfoById(id, data);
    return res.status(200).json(result);
};

export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteUserInfoById(id);
    return res.status(200).json(result);
};
