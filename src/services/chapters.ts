import * as chapterRepository from '@/repositories/chapters';
import { Chapter, ChapterResponse } from '@/types/chapter';

export const addChapter = async (chapter: Chapter): Promise<ChapterResponse> => {
    const result = await chapterRepository.createChapter(chapter);

    return result;
};

export const updateChapter = async (id: string, chapter: Chapter) => {
    const result = await chapterRepository.updateChapterById(id, chapter);

    return result;
};
