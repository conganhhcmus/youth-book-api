import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import { getComicResponse } from '@/helpers/comic';
import * as comicRepository from '@/repositories/comics';
import * as chapterRepository from '@/repositories/chapters';
import { ComicResponse, ComicBaseResponse, ComicBaseData, ComicData, Comic } from '@/types/comics';

export const searchComic = async (page: number, q: string) => {
    const result = await comicRepository.getComics(page, q);
    const data = result.data;

    return { totalPage: result.totalPage, currentPage: result.currentPage, data: data };
};

export const getRecommendComics = async (page: number) => {
    const result = await comicRepository.getRecommendComics(page);
    return result;
};

export const getRecentUpdatedComics = async (page: number) => {
    const result = await comicRepository.getRecentUpdatedComics(page);
    return result;
};

export const getComicsByGenres = async (type: string, page: number) => {
    const result = await comicRepository.getComicsByGenres(type, page);
    const data = result.data;

    return { totalPage: result.totalPage, currentPage: result.currentPage, data: data };
};

export const getTopComics = async (type: string, page: number) => {
    const result = await comicRepository.getRecentUpdatedComics(page);
    return result;
};

export const addComic = async (comic: Comic): Promise<ComicResponse> => {
    const result = await comicRepository.createComic(comic);

    return getComicResponse(result);
};

export const updateComicById = async (id: string, comic: Comic) => {
    const result = await comicRepository.updateComicById(id, comic);
    return result;
};

export const getComicById = async (id: string) => {
    const result = await comicRepository.getComicById(id);

    // update views

    return result;
};

export const deleteComicById = async (id: string) => {
    // remove all chapter
    await chapterRepository.deleteChapterByComicId(id);

    const result = await comicRepository.deleteComicById(id);

    return result;
};
