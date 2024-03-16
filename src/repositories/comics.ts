import { DEFAULT_COMIC_PAGE_SIZE, DEFAULT_PAGE_SIZE } from '@/constants/paging';
import ComicsModel from '@/models/comics';
import { Types } from 'mongoose';
import { Comic } from '@/types/comics';

const getComicByPageAndQuery = async (page: number, query: {}, pageSize: number = DEFAULT_COMIC_PAGE_SIZE) => {
    const total = await ComicsModel.countDocuments().exec();
    const comics = await ComicsModel.aggregate([
        {
            $lookup: {
                from: 'chapters',
                localField: '_id',
                foreignField: 'comicId',
                pipeline: [
                    {
                        $sort: {
                            createTime: -1,
                        },
                    },
                ],
                as: 'chapters',
            },
        },
        {
            $lookup: {
                from: 'genres',
                localField: 'genres',
                foreignField: '_id',
                as: 'genres',
            },
        },
        { $skip: pageSize * page - pageSize },
        { $limit: pageSize },
        { $match: query },
    ]);

    return { data: comics, totalPage: Math.ceil(total / pageSize), currentPage: page };
};

export const getComics = async (page: number, q: string) => {
    const query = !!q ? { name: { $regex: '.*' + q + '.*', $options: 'i' } } : {};
    return getComicByPageAndQuery(page, query, DEFAULT_PAGE_SIZE);
};

export const getComicsByGenres = async (type: string, page: number) => {
    const query = type == 'all' ? {} : { 'genres._id': new Types.ObjectId(type) };
    return getComicByPageAndQuery(page, query);
};

export const getRecommendComics = async (page: number) => {
    const query = { recommend: true };
    return getComicByPageAndQuery(page, query);
};

export const getRecentUpdatedComics = async (page: number) => {
    const query = {};
    return getComicByPageAndQuery(page, query);
};

export const getComicById = async (id: string) => {
    const query = { _id: new Types.ObjectId(id) };
    const comics = await ComicsModel.aggregate([
        {
            $lookup: {
                from: 'chapters',
                localField: '_id',
                foreignField: 'comicId',
                pipeline: [
                    {
                        $sort: {
                            createTime: 1,
                        },
                    },
                ],
                as: 'chapters',
            },
        },
        {
            $lookup: {
                from: 'genres',
                localField: 'genres',
                foreignField: '_id',
                as: 'genres',
            },
        },
        { $match: query },
    ]);

    return comics[0] || undefined;
};

export const createComic = (values: Record<string, any>): Promise<Comic> => new ComicsModel(values).save().then((comic) => comic.toObject());

export const updateComicById = (id: string, values: Record<string, any>) => ComicsModel.findByIdAndUpdate(id, values, { new: true });

export const deleteComicById = (id: string) => ComicsModel.findByIdAndDelete(id);
