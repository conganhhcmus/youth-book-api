import { Request, Response } from 'express';
import * as dashboardService from '@/services/dashboard';

export const getDashboard = async (req: Request, res: Response) => {
    const result = await dashboardService.getDashboard();

    return res.status(200).json(result);
};
