import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import ComicsModel from '@/models/comics';
import { Comic } from '@/types/comics';

export const getComics = async (page: number, q: string) => {
    const query = !!q ? { name: { $regex: '.*' + q + '.*', $options: 'i' } } : {};
    const total = await ComicsModel.countDocuments().exec();
    const comics = await ComicsModel.aggregate([
        {
            $lookup: {
                from: 'Chapter',
                localField: '_id',
                foreignField: 'comicId',
                as: 'chapters',
            },
        },
        {
            $lookup: {
                from: 'Genres',
                localField: 'genres',
                foreignField: '_id',
                as: 'genres',
            },
        },
        { $skip: DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE },
        { $limit: DEFAULT_PAGE_SIZE },
        { $match: query },
    ]);

    return { data: comics, totalPage: Math.ceil(total / DEFAULT_PAGE_SIZE), currentPage: page };
};

export const createComic = (values: Record<string, any>): Promise<Comic> => new ComicsModel(values).save().then((comic) => comic.toObject());

export const updateComicById = (id: string, values: Record<string, any>) => ComicsModel.findByIdAndUpdate(id, values, { new: true });

export const deleteComicById = (id: string) => ComicsModel.findByIdAndDelete(id);
