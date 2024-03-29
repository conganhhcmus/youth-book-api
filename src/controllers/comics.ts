import { INVALID_PARAMETERS } from '@/constants/error';
import { cloudinaryRemove, cloudinaryUpload } from '@/middlewares/uploadFile';
import * as comicService from '@/services/comics';
import { Comic, ComicResponse } from '@/types/comics';
import { BadRequestError } from '@/types/error';
import { Request, Response } from 'express';

export const searchComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const query = (req.query.q as string) || '';

    const result = await comicService.searchComic(page, query);
    return res.json(result);
};

export const getAllComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const query = (req.query.q as string) || '';

    const result = await comicService.getAllComic(page, query);
    return res.json(result);
};

export const recommendComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;

    const result = await comicService.getRecommendComics(page);
    return res.json(result);
};

export const recentUpdatedComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const status = req.query.status as string;

    const result = await comicService.getRecentUpdatedComics(page, status);
    return res.json(result);
};

export const topComics = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const type = req.query.type as string;
    const status = req.query.status as string;

    const result = await comicService.getTopComics(type, page, status);
    return res.json(result);
};

export const getComicsByGenres = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const type = req.query.type as string;

    const result = await comicService.getComicsByGenres(type, page);
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

export const updateThumbnail = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new BadRequestError(INVALID_PARAMETERS);
    }
    const { id } = req.params;

    const resultUpload = await cloudinaryUpload(req.file);

    const result = await comicService.updateThumbnailById(id, resultUpload.secure_url, resultUpload.public_id);

    result.thumbnailId && (await cloudinaryRemove(result.thumbnailId));

    return res.status(201).json(result);
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
