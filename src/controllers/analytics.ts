import { Request, Response } from 'express';
import * as analyticsService from '@/services/analytics';
import { Blob } from 'buffer';

export const getAnalytics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const type = parseInt(req.query.type as string, 10) || 0;
    const query = (req.query.q as string) || '';

    const result = await analyticsService.getAnalytics(query, page, type);

    return res.status(200).json(result);
};

export const getAnalyticsDetails = async (req: Request, res: Response) => {
    const { id } = req.params;
    const page = parseInt(req.query.page as string, 10) || 1;
    const type = parseInt(req.query.type as string, 10) || 0;
    const query = (req.query.q as string) || '';

    const result = await analyticsService.getAnalyticsDetail(id, query, page, type);

    return res.status(200).json(result);
};

export const exportAnalyticsDetails = async (req: Request, res: Response) => {
    const { id } = req.params;
    const type = parseInt(req.query.type as string, 10) || 0;

    const data = await analyticsService.exportAnalyticsDetail(id, type);

    res.header('Content-disposition', 'attachment; filename=analytics.xlsx');
    res.header('Content-type', 'application/vnd.ms-excel');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    return res.status(200).send(data);
};
