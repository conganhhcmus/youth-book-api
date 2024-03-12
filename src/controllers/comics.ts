import {
    addNewComic,
    getComicInfoById,
    getGenresComics,
    getRecentUpdatedComics,
    getRecommendComics,
    getTopComics,
    searchComicByName,
    updateComicInfoById,
} from '@/services/comics';
import { Comic, ComicResponse } from '@/types/comics';
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

export const addComic = async (req: Request, res: Response) => {
    const data = req.body as Comic;

    const result = addNewComic(data);
    return res.json(result);
};

export const updateComic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as Comic;

    const result = updateComicInfoById(id, data);
    return res.json(result);
};

export const genresComics = async (req: Request, res: Response) => {
    const result = await getGenresComics();

    return res.json(result);
};

export const getComicInfo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getComicInfoById(id);

    return res.json(result);
};
