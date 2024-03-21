import * as comicRepository from '@/repositories/comics';
import * as chapterRepository from '@/repositories/chapters';
import { ComicResponse, Comic } from '@/types/comics';

export const searchComic = async (page: number, q: string) => {
    const result = await comicRepository.getSearchComics(page, q);
    const data = result.data;

    return { totalPage: result.totalPage, currentPage: result.currentPage, data: data };
};

export const getAllComic = async (page: number, q: string) => {
    const result = await comicRepository.getAllComics(page, q);
    const data = result.data;

    return { totalPage: result.totalPage, currentPage: result.currentPage, data: data };
};

export const getRecommendComics = async (page: number) => {
    const result = await comicRepository.getRecommendComics(page);
    return result;
};

export const getRecentUpdatedComics = async (page: number, status: string) => {
    const result = await comicRepository.getRecentUpdatedComics(page, status);
    return result;
};

export const getComicsByGenres = async (type: string, page: number) => {
    const result = await comicRepository.getComicsByGenres(type, page);
    const data = result.data;

    return { totalPage: result.totalPage, currentPage: result.currentPage, data: data };
};

export const getTopComics = async (type: string, page: number, status: string) => {
    const result = await comicRepository.getTopComics(type, page, status);
    return result;
};

export const addComic = async (comic: Comic) => {
    const result = await comicRepository.createComic(comic);

    return result;
};

export const updateComicById = async (id: string, comic: Comic) => {
    const result = await comicRepository.updateComicById(id, comic);
    return result;
};

export const updateThumbnailById = async (id: string, thumbnailUrl: string, thumbnailId: string) => {
    return await comicRepository.updateThumbnailById(id, thumbnailUrl, thumbnailId);
};

export const getComicById = async (id: string) => {
    const result = await comicRepository.getComicById(id);

    // update views
    await comicRepository.updateTotalViewsById(id);

    return result;
};

export const deleteComicById = async (id: string) => {
    // remove all chapter
    await chapterRepository.deleteChapterByComicId(id);

    const result = await comicRepository.deleteComicById(id);

    return result;
};
