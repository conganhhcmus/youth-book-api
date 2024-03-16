import * as genresRepository from '@/repositories/genres';
import { Genres, GenresResponse } from '@/types/genres';

export const getAllGenres = async (page: number, q: string) => {
    const result = await genresRepository.getAllGenres(page, q);

    return result;
};

export const getFullGenres = async () => {
    const result = await genresRepository.getFullGenres();

    return result;
};

export const getGenresById = async (id: string) => {
    const result = await genresRepository.getGenresById(id);

    return result;
};

export const addGenres = async (genres: Genres): Promise<GenresResponse> => {
    const result = await genresRepository.createGenres(genres);

    return result;
};

export const updateGenres = async (id: string, genres: Genres) => {
    const result = await genresRepository.updateGenresById(id, genres);

    return result;
};

export const deleteGenres = async (id: string) => {
    const result = await genresRepository.deleteGenresById(id);

    return result;
};
