import { getRecentUpdatedComics, getRecommendComics, getTopComics, searchComicByName } from '@/services/comics';
import { Request, Response } from 'express';

export const searchComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const query = (req.query.q as string) || '';

    const result = searchComicByName(query, page);
    return res.json(result);
};

export const recommendComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;

    const result = getRecommendComics(page);
    return res.json(result);
};

export const recentUpdatedComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;

    const result = getRecentUpdatedComics(page);
    return res.json(result);
};

export const topComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const type = req.query.type as string;

    const result = getTopComics(type, page);
    return res.json(result);
};
