import * as chapterService from '@/services/chapters';
import { Chapter } from '@/types/chapter';
import { Request, Response } from 'express';

export const getAllChapter = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const q = (req.query.q as string) || '';
    const comicId = (req.query.comicId as string) || '';

    const result = await chapterService.getAllChapterByComicId(page, q, comicId);
    return res.json(result);
};

export const getChapterById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await chapterService.getChapterById(id);
    return res.json(result);
};

export const addChapter = async (req: Request, res: Response) => {
    const data = req.body as Chapter;

    const result = await chapterService.addChapter(data);
    return res.json(result);
};

export const updateChapter = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as Chapter;

    const result = await chapterService.updateChapter(id, data);
    return res.json(result);
};

export const deleteChapter = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await chapterService.deleteChapter(id);
    return res.json(result);
};
