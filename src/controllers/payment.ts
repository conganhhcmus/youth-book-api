import { INVALID_PARAMETERS } from '@/constants/error';
import { BadRequestError } from '@/types/error';
import { Request, Response } from 'express';
import * as paymentService from '@/services/payment';
import { UserJwtPayload } from '@/types/users';
import { Transaction } from '@/types/transaction';

export const depositAccount = async (req: Request, res: Response) => {
    const amount = parseInt(req.body.amount, 10) || 0;
    const payload = req['identity'] as UserJwtPayload;

    if (amount === 0) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }

    const result = await paymentService.depositAccount(amount, payload._id);

    return res.status(200).json(result);
};

export const buyChapter = async (req: Request, res: Response) => {
    const amount = parseInt(req.body.amount, 10) || 0;
    const chapterId = (req.body.chapterId as string) || '';
    const payload = req['identity'] as UserJwtPayload;

    if (amount === 0 || chapterId === '') {
        throw new BadRequestError(INVALID_PARAMETERS);
    }

    const result = await paymentService.buyChapter(amount, payload._id, chapterId);

    return res.status(200).json(result);
};

export const getAllTransactionByUserId = async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const page = parseInt(req.query.page as string, 10) || 1;
    const option = parseInt(req.query.option as string, 10) || 0;
    const status = req.query.status ? (req.query.status as string[]).map((x) => parseInt(x, 10) || 0) : [];

    const result = await paymentService.getAllTransactionByUserId(userId, option, status, page);

    return res.status(200).json(result);
};

export const getAllBuyTransactionByUserId = async (req: Request, res: Response) => {
    const { id: userId } = req.params;

    const result = await paymentService.getAllBuyTransactionByUserId(userId);

    return res.status(200).json(result);
};

export const getAllTransaction = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const option = parseInt(req.query.option as string, 10) || 0;
    const status = req.query.status ? (req.query.status as string[]).map((x) => parseInt(x, 10) || 0) : [];
    const q = (req.query.q as string) || '';

    const result = await paymentService.getAllTransaction(option, status, page, q);

    return res.status(200).json(result);
};

export const updateTransactionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const status = parseInt(req.body.status as string, 10) || 0;
    const payload = req['identity'] as UserJwtPayload;

    if (status == 0) throw new BadRequestError(INVALID_PARAMETERS);

    const result = await paymentService.updateTransactionById(id, payload._id, status);

    return res.status(200).json(result);
};
