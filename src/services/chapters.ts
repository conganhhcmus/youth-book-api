import { createChapter } from '@/repositories/chapters';
import { Chapter, ChapterResponse } from '@/types/chapter';

export const addNewChapter = async (chapter: Chapter): Promise<ChapterResponse> => {
    const result = await createChapter(chapter);

    return result;
};
