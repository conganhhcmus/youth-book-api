import * as comicService from '@/services/comics';
import { Comic, ComicResponse } from '@/types/comics';
import { Request, Response } from 'express';

export const searchComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const query = (req.query.q as string) || '';

    const result = await comicService.searchComic(page, query);
    return res.json(result);
};

export const recommendComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;

    const result = await comicService.getRecommendComics(page);
    return res.json(result);
};

export const recentUpdatedComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;

    const result = await comicService.getRecentUpdatedComics(page);
    return res.json(result);
};

export const topComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const type = req.query.type as string;

    const result = await comicService.getTopComics(type, page);
    return res.json(result);
};

export const addComic = async (req: Request, res: Response) => {
    const data = req.body as Comic;

    const result = await comicService.addComic(data);
    return res.json(result);
};

export const updateComic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as Comic;

    const result = await comicService.updateComicById(id, data);
    return res.json(result);
};

export const getComicInfo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await comicService.getComicById(id);

    return res.json(result);
};

export const deleteComic = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await comicService.deleteComicById(id);

    return res.json(result);
};
