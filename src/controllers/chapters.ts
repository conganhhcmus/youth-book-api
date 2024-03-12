import { addNewChapter } from '@/services/chapters';
import { Chapter } from '@/types/chapter';
import { Request, Response } from 'express';

export const addChapter = async (req: Request, res: Response) => {
    const data = req.body as Chapter;

    const result = addNewChapter(data);
    return res.json(result);
};
