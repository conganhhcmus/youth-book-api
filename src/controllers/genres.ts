import * as genresService from '@/services/genres';
import { Genres } from '@/types/genres';
import { Request, Response } from 'express';

export const getAllGenres = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const q = (req.query.q as string) || '';

    const result = await genresService.getAllGenres(page, q);
    return res.status(200).json(result);
};

export const getGenresById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await genresService.getGenresById(id);
    return res.status(200).json(result);
};

export const addGenres = async (req: Request, res: Response) => {
    const data = req.body as Genres;

    const result = await genresService.addGenres(data);
    return res.json(result);
};

export const updateGenres = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as Genres;

    const result = await genresService.updateGenres(id, data);
    return res.json(result);
};

export const deleteGenres = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await genresService.deleteGenres(id);
    return res.json(result);
};
