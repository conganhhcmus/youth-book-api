import { Comic, ComicResponse } from '@/types/comics';

export const getComicResponse = (data: Comic): ComicResponse => {
    return { name: data.name, description: data.description } as ComicResponse;
};
