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

export const getRecommendComics = (page: number): ComicBaseData => {
    let result: ComicBaseResponse[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            _id: index.toString(),
            name: `Test ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            chapters: [
                {
                    _id: '1',
                    name: 'Chap 1',
                    createTime: new Date(),
                    updateTime: new Date(),
                },
                {
                    _id: '2',
                    name: 'Chap 2',
                    createTime: new Date(),
                    updateTime: new Date(),
                },
            ],
            genres: [
                {
                    _id: '1',
                    name: 'Genres 1',
                },
                {
                    _id: '2',
                    name: 'Genres 2',
                },
            ],
            author: `Kai test ${index}`,
        });
    }
    return { totalPage: 100, currentPage: page, data: result };
};

export const getRecentUpdatedComics = (page: number): ComicData => {
    let result: ComicResponse[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            _id: index.toString(),
            name: `Test ${index}`,
            otherName: [],
            description: `description ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            chapters: [
                {
                    _id: `1-${index}`,
                    name: 'Chapter 1',
                    createTime: new Date(),
                    updateTime: new Date(),
                },
                {
                    _id: `2-${index}`,
                    name: 'Chapter 2',
                    createTime: new Date(),
                    updateTime: new Date(),
                },
                {
                    _id: `3-${index}`,
                    name: 'Chapter 3',
                    createTime: new Date(),
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
            totalViews: 100,
        });
    }
    return { totalPage: 100, currentPage: page, data: result };
};

export const getTopComics = (type: string, page: number): ComicData => {
    let result: ComicResponse[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            _id: index.toString(),
            name: `Test ${index}`,
            otherName: [],
            description: `description ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            chapters: [
                {
                    _id: `1-${index}`,
                    name: 'Chapter 1',
                    updateTime: new Date(),
                    createTime: new Date(),
                },
                {
                    _id: `2-${index}`,
                    name: 'Chapter 2',
                    createTime: new Date(),
                    updateTime: new Date(),
                },
                {
                    _id: `3-${index}`,
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

export const getComicInfoById = async (id: string): Promise<ComicResponse> => {
    const index = 1;
    return {
        _id: index.toString(),
        name: `Test ${index}`,
        otherName: [],
        description: `description ${index}`,
        thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
        chapters: [
            {
                _id: `1-${index}`,
                name: 'Chapter 1',
                updateTime: new Date(),
                createTime: new Date(),
            },
            {
                _id: `2-${index}`,
                name: 'Chapter 2',
                updateTime: new Date(),
                createTime: new Date(),
            },
            {
                _id: `3-${index}`,
                name: 'Chapter 3',
                updateTime: new Date('01/01/2024'),
                createTime: new Date(),
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
    };
};
