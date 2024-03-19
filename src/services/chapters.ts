import * as chapterRepository from '@/repositories/chapters';
import { Chapter, ChapterResponse } from '@/types/chapter';

export const getAllChapterByComicId = async (page: number, q: string, comicId: string) => {
    const result = await chapterRepository.getAllChapterByComicId(page, q, comicId);

    return result;
};

export const getFullChapterByComicId = async (comicId: string) => {
    const result = await chapterRepository.getFullChapterByComicId(comicId);

    return result;
};

export const getChapterById = async (id: string) => {
    console.log(id);
    const result = await chapterRepository.getChapterById(id);

    return result;
};

export const addChapter = async (chapter: Chapter): Promise<ChapterResponse> => {
    const result = await chapterRepository.createChapter(chapter);

    return result;
};

export const updateChapter = async (id: string, chapter: Chapter) => {
    const result = await chapterRepository.updateChapterById(id, chapter);

    return result;
};

export const deleteChapter = async (id: string) => {
    const result = await chapterRepository.deleteChapterById(id);

    return result;
};
