import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import { getComicResponse } from '@/helpers/comic';
import { createComic, updateComicById } from '@/repositories/comics';
import { ComicResponse, ComicBaseResponse, ComicBaseData, ComicData, GenresResponse, Comic } from '@/types/comics';

export const searchComicByName = (query: string, page: number): ComicBaseData => {
    let result: ComicBaseResponse[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            _id: index.toString(),
            title: `Test ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            chapters: [
                {
                    id: '1',
                    name: 'Chap 1',
                    updatedAt: new Date(),
                },
                {
                    id: '2',
                    name: 'Chap 2',
                    updatedAt: new Date(),
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

export const getRecommendComics = (page: number): ComicBaseData => {
    let result: ComicBaseResponse[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            _id: index.toString(),
            title: `Test ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            chapters: [
                {
                    id: '1',
                    name: 'Chap 1',
                    updatedAt: new Date(),
                },
                {
                    id: '2',
                    name: 'Chap 2',
                    updatedAt: new Date(),
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
            title: `Test ${index}`,
            otherName: [],
            description: `description ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            chapters: [
                {
                    id: `1-${index}`,
                    name: 'Chapter 1',
                    updatedAt: new Date(),
                },
                {
                    id: `2-${index}`,
                    name: 'Chapter 2',
                    updatedAt: new Date(),
                },
                {
                    id: `3-${index}`,
                    name: 'Chapter 3',
                    updatedAt: new Date('01/01/2024'),
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
            title: `Test ${index}`,
            otherName: [],
            description: `description ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            chapters: [
                {
                    id: `1-${index}`,
                    name: 'Chapter 1',
                    updatedAt: new Date(),
                },
                {
                    id: `2-${index}`,
                    name: 'Chapter 2',
                    updatedAt: new Date(),
                },
                {
                    id: `3-${index}`,
                    name: 'Chapter 3',
                    updatedAt: new Date('01/01/2024'),
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

export const addNewComic = async (comic: Comic): Promise<ComicResponse> => {
    const result = await createComic(comic);

    return getComicResponse(result);
};

export const updateComicInfoById = async (id: string, comic: Comic) => {
    const result = await updateComicById(id, comic);
    return result;
};

export const getGenresComics = async (): Promise<GenresResponse[]> => {
    return [
        {
            _id: '1',
            name: 'Genres 1',
        },
        {
            _id: '2',
            name: 'Genres 2',
        },
    ] as GenresResponse[];
};

export const getComicInfoById = async (id: string): Promise<ComicResponse> => {
    const index = 1;
    return {
        _id: index.toString(),
        title: `Test ${index}`,
        otherName: [],
        description: `description ${index}`,
        thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
        chapters: [
            {
                id: `1-${index}`,
                name: 'Chapter 1',
                updatedAt: new Date(),
            },
            {
                id: `2-${index}`,
                name: 'Chapter 2',
                updatedAt: new Date(),
            },
            {
                id: `3-${index}`,
                name: 'Chapter 3',
                updatedAt: new Date('01/01/2024'),
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
