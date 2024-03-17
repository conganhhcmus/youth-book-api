import { DEFAULT_COMIC_PAGE_SIZE, DEFAULT_PAGE_SIZE } from '@/constants/paging';
import ComicsModel from '@/models/comics';
import { Types } from 'mongoose';
import { Comic } from '@/types/comics';
import { ComicStatus } from '@/constants/comic';

const getComicByPageAndQuery = async (page: number, query: {}, sort: {}, pageSize: number = DEFAULT_COMIC_PAGE_SIZE) => {
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
        { $match: query },
        { $sort: sort },
        { $skip: pageSize * page - pageSize },
        { $limit: pageSize },
    ]);

    return { data: comics, totalPage: Math.ceil(total / pageSize), currentPage: page };
};

export const getComics = async (page: number, q: string) => {
    const query = !!q ? { name: { $regex: '.*' + q + '.*', $options: 'i' } } : {};
    const sort = { createTime: -1, updateTime: -1 };

    return getComicByPageAndQuery(page, query, sort, DEFAULT_PAGE_SIZE);
};

export const getComicsByGenres = async (type: string, page: number) => {
    const query = type == 'all' ? {} : { 'genres._id': new Types.ObjectId(type) };
    const sort = { createTime: -1, updateTime: -1 };

    return getComicByPageAndQuery(page, query, sort);
};

export const getRecommendComics = async (page: number) => {
    const query = { recommend: true };
    const sort = { createTime: -1, updateTime: -1 };

    return getComicByPageAndQuery(page, query, sort);
};

export const getRecentUpdatedComics = async (page: number, status: string) => {
    const query = status == 'all' ? {} : { status: ComicStatus[status] };
    const sort = { createTime: -1, updateTime: -1 };

    return getComicByPageAndQuery(page, query, sort);
};

export const getTopComics = async (type: string, page: number, status: string) => {
    const query = status == 'all' ? {} : { status: ComicStatus[status] };
    const sort = { totalViews: -1, createTime: -1, updateTime: -1 };

    return getComicByPageAndQuery(page, query, sort);
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

export const updateTotalViewsById = (id: string) =>
    ComicsModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $inc: { totalViews: 1 } }, { new: true });
