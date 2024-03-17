import { INVALID_PARAMETERS } from '@/constants/error';
import { cloudinaryRemove, cloudinaryUpload } from '@/middlewares/uploadFile';
import * as userService from '@/services/users';
import { BadRequestError } from '@/types/error';
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

export const updateAvatarById = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }
    const { id } = req.params;

    const resultUpload = await cloudinaryUpload(req.file);

    const result = await userService.updateAvatarById(id, resultUpload.secure_url, resultUpload.public_id);

    result.avatarId && (await cloudinaryRemove(result.avatarId));

    return res.status(201).json(result);
};
