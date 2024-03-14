import * as userService from '@/services/users';
import { User } from '@/types/users';
import { Request, Response } from 'express';

export const getAllUser = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const q = (req.query.q as string) || '';
    const result = await userService.getAllUsers(page, q);
    return res.status(200).json(result);
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userService.getUserById(id);
    return res.status(200).json(result);
};

export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: User = req.body;
    const result = await userService.updateUserById(id, data);
    return res.status(200).json(result);
};

export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userService.deleteUserById(id);
    return res.status(200).json(result);
};
