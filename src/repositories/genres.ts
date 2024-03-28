import GenresModel from '@/models/genres';
import { GenresResponse } from '@/types/genres';

export const getAllGenres = async (page: number, q: string) => {
    const defaultPageSize = 10;
    const query = !!q ? { name: { $regex: '.*' + q + '.*', $options: 'i' } } : {};
    const total = await GenresModel.countDocuments(query).exec();
    const genres = await GenresModel.find(query)
        .sort({ name: 1 })
        .skip(defaultPageSize * page - defaultPageSize)
        .limit(defaultPageSize);

    return { data: genres, totalPage: Math.ceil(total / defaultPageSize), currentPage: page };
};

export const getFullGenres = async () => {
    const genres = await GenresModel.find({}).sort({ name: 1 });

    return genres;
};

export const createGenres = (values: Record<string, any>): Promise<GenresResponse> =>
    new GenresModel(values).save().then((genres) => genres.toObject());

export const getGenresById = (id: string) => GenresModel.findById(id);

export const updateGenresById = (id: string, values: Record<string, any>) => GenresModel.findByIdAndUpdate(id, values, { new: true });

export const deleteGenresByComicId = (comicId: string) => GenresModel.deleteMany({ comicId: comicId });

export const deleteGenresById = (id: string) => GenresModel.findByIdAndDelete(id);
