import { deleteUserInfoById, getAllUsers, getUserInfoById, updateUserInfoById } from '@/services/users';
import { User } from '@/types/users';
import { Request, Response } from 'express';

export const getAllUserInfo = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const q = (req.query.q as string) || '';
    const result = await getAllUsers(page, q);
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
