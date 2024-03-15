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

export const getTopComics = (type: string, page: number): ComicData => {
    let result: ComicResponse[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            _id: index.toString(),
            name: `Test ${index}`,
            otherName: [],
            recommend: false,
            status: 0,
            totalFollowers: 0,
            description: `description ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            chapters: [
                {
                    _id: `1-${index}`,
                    name: 'Chapter 1',
                    shortName: 'Chapter 1',
                    updateTime: new Date(),
                    createTime: new Date(),
                },
                {
                    _id: `2-${index}`,
                    name: 'Chapter 2',
                    shortName: 'Chapter 2',
                    createTime: new Date(),
                    updateTime: new Date(),
                },
                {
                    _id: `3-${index}`,
                    shortName: 'Chapter 3',
                    createTime: new Date(),
                    name: 'Chapter 3',
                    updateTime: new Date('01/01/2024'),
                },
            ],
            genres: [
                {
                    _id: '1',
                    name: 'Genres 1',
                },
                {
                    _id: '2',
                    name: 'Genres 1',
                },
            ],
            author: `Kai test ${index}`,
            totalViews: 1000,
        });
    }
    return { totalPage: 100, currentPage: page, data: result };
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

    return result;
};

export const deleteComicById = async (id: string) => {
    // remove all chapter
    await chapterRepository.deleteChapterByComicId(id);

    const result = await comicRepository.deleteComicById(id);

    return result;
};
