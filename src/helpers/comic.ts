import { Comic, ComicResponse } from '@/types/comics';

export const getComicResponse = (data: Comic): ComicResponse => {
    return { title: data.name, description: data.description } as ComicResponse;
};
