import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import { Comic, ComicBase, ComicBaseData, ComicData } from '@/types/comics';

export const searchComicByName = (query: string, page: number): ComicBase[] => {
    let result: ComicBase[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            id: index.toString(),
            title: `Test ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            latest_chapter: [
                {
                    id: '1',
                    name: 'Chap 1',
                    updated_at: new Date(),
                },
                {
                    id: '2',
                    name: 'Chap 2',
                    updated_at: new Date(),
                },
            ],
            genres: [
                {
                    id: '1',
                    name: 'Genres 1',
                },
                {
                    id: '2',
                    name: 'Genres 2',
                },
            ],
            authors: `Kai test ${index}`,
        });
    }
    return result;
};

export const getRecommendComics = (page: number): ComicBaseData => {
    let result: ComicBase[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            id: index.toString(),
            title: `Test ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            latest_chapter: [
                {
                    id: '1',
                    name: 'Chap 1',
                    updated_at: new Date(),
                },
                {
                    id: '2',
                    name: 'Chap 2',
                    updated_at: new Date(),
                },
            ],
            genres: [
                {
                    id: '1',
                    name: 'Genres 1',
                },
                {
                    id: '2',
                    name: 'Genres 2',
                },
            ],
            authors: `Kai test ${index}`,
        });
    }
    return { totalPage: 100, currentPage: page, data: result };
};

export const getRecentUpdatedComics = (page: number): ComicData => {
    let result: Comic[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            id: index.toString(),
            title: `Test ${index}`,
            other_name: [],
            short_description: `description ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            latest_chapter: [
                {
                    id: `1-${index}`,
                    name: 'Chapter 1',
                    updated_at: new Date(),
                },
                {
                    id: `2-${index}`,
                    name: 'Chapter 2',
                    updated_at: new Date(),
                },
                {
                    id: `3-${index}`,
                    name: 'Chapter 3',
                    updated_at: new Date('01/01/2024'),
                },
            ],
            genres: [
                {
                    id: '1',
                    name: 'Genres 1',
                },
                {
                    id: '2',
                    name: 'Genres 1',
                },
            ],
            authors: `Kai test ${index}`,
        });
    }
    return { totalPage: 100, currentPage: page, data: result };
};

export const getTopComics = (type: string, page: number): ComicData => {
    let result: Comic[] = [];
    for (let index = 0; index < DEFAULT_PAGE_SIZE; index++) {
        result = result.concat({
            id: index.toString(),
            title: `Test ${index}`,
            other_name: [],
            short_description: `description ${index}`,
            thumbnail: `https://source.unsplash.com/random/300x200?sig=${index}`,
            latest_chapter: [
                {
                    id: `1-${index}`,
                    name: 'Chapter 1',
                    updated_at: new Date(),
                },
                {
                    id: `2-${index}`,
                    name: 'Chapter 2',
                    updated_at: new Date(),
                },
                {
                    id: `3-${index}`,
                    name: 'Chapter 3',
                    updated_at: new Date('01/01/2024'),
                },
            ],
            genres: [
                {
                    id: '1',
                    name: 'Genres 1',
                },
                {
                    id: '2',
                    name: 'Genres 1',
                },
            ],
            authors: `Kai test ${index}`,
        });
    }
    return { totalPage: 100, currentPage: page, data: result };
};
