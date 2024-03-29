import * as chapterRepository from '@/repositories/chapters';
import * as comicRepository from '@/repositories/comics';
import * as viewerRepository from '@/repositories/viewer';
import { Chapter, ChapterResponse } from '@/types/chapter';
import { Viewer } from '@/types/viewer';
import moment from 'moment';

export const getAllChapterByComicId = async (page: number, q: string, comicId: string) => {
    const result = await chapterRepository.getAllChapterByComicId(page, q, comicId);

    return result;
};

export const getFullChapterByComicId = async (comicId: string) => {
    const result = await chapterRepository.getFullChapterByComicId(comicId);

    return result;
};

export const getChapterById = async (id: string, userId: string, skipCount: boolean) => {
    const result = await chapterRepository.getChapterById(id);

    if (skipCount) return result;

    // update comic views
    const data = {
        userId: userId,
        chapterId: id,
        comicId: result.comicId,
        createTime: moment().utc().toDate(),
    } as Viewer;

    if (userId) {
        const updateResult = await viewerRepository.updateViewer(data);
        updateResult.upsertedId && (await comicRepository.updateTotalViewsById(result.comicId.toString()));
    } else {
        await viewerRepository.addViewer(data);
        result.comicId && (await comicRepository.updateTotalViewsById(result.comicId.toString()));
    }

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
