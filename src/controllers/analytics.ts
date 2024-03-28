import { Request, Response } from 'express';
import * as analyticsService from '@/services/analytics';

export const getAnalytics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const type = parseInt(req.query.type as string, 10) || 0;
    const query = (req.query.q as string) || '';

    const result = await analyticsService.getAnalytics(query, page, type);

    return res.status(200).json(result);
};
