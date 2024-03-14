import * as chapterService from '@/services/chapters';
import { Chapter } from '@/types/chapter';
import { Request, Response } from 'express';

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
