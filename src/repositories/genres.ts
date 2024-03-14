import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import GenresModel from '@/models/genres';
import { GenresResponse } from '@/types/genres';

export const getAllGenres = async (page: number, q: string) => {
    const query = !!q ? { name: { $regex: '.*' + q + '.*', $options: 'i' } } : {};
    const total = await GenresModel.countDocuments().exec();
    const users = await GenresModel.find(query)
        .skip(DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE)
        .limit(DEFAULT_PAGE_SIZE);

    return { data: users, totalPage: Math.ceil(total / DEFAULT_PAGE_SIZE), currentPage: page };
};

export const createGenres = (values: Record<string, any>): Promise<GenresResponse> =>
    new GenresModel(values).save().then((genres) => genres.toObject());

export const getGenresById = (id: string) => GenresModel.findById(id);

export const updateGenresById = (id: string, values: Record<string, any>) => GenresModel.findByIdAndUpdate(id, values, { new: true });

export const deleteGenresByComicId = (comicId: string) => GenresModel.deleteMany({ comicId: comicId });

export const deleteGenresById = (id: string) => GenresModel.findByIdAndDelete(id);
