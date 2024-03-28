import { DEFAULT_COMIC_PAGE_SIZE, DEFAULT_PAGE_SIZE } from '@/constants/paging';
import ComicsModel from '@/models/comics';
import { Types } from 'mongoose';
import { Comic } from '@/types/comics';
import { ComicStatus, TopComicType } from '@/constants/comic';
import moment from 'moment';

const getComicByPageAndQuery = async (page: number, query: {}, sort: {}, pageSize: number = DEFAULT_COMIC_PAGE_SIZE) => {
    const total = await ComicsModel.countDocuments(query).exec();
    const comics = await ComicsModel.aggregate([
        { $match: query },
        { $sort: sort },
        { $skip: pageSize * page - pageSize },
        { $limit: pageSize },
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
    ]);

    return { data: comics, totalPage: Math.ceil(total / pageSize), currentPage: page };
};

export const getSearchComics = async (page: number, q: string) => {
    const query = !!q ? { name: { $regex: '.*' + q + '.*', $options: 'i' } } : {};
    const sort = { createTime: -1, updateTime: -1 };

    return getComicByPageAndQuery(page, query, sort);
};

export const getAllComics = async (page: number, q: string) => {
    const query = !!q ? { name: { $regex: '.*' + q + '.*', $options: 'i' } } : {};
    const sort = { createTime: -1, updateTime: -1 };

    return getComicByPageAndQuery(page, query, sort, DEFAULT_PAGE_SIZE);
};

export const getComicsByGenres = async (type: string, page: number) => {
    const query = type == 'all' ? {} : { genres: { $in: [new Types.ObjectId(type)] } };
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
    let day = 0;
    switch (type) {
        case TopComicType.daily:
            day = 1;
            break;
        case TopComicType.weekly:
            day = 7;
            break;
        case TopComicType.monthly:
            day = 30;
            break;
        default:
            day = 0;
    }
    const date = moment().utc().endOf('day').subtract(day, 'days').toDate();
    const queryDate = day !== 0 ? { createTime: { $gt: date } } : {};

    const query = status == 'all' ? {} : { status: ComicStatus[status] };
    const total = await ComicsModel.countDocuments(query).exec();
    const comics = await ComicsModel.aggregate([
        { $match: query },
        {
            $lookup: {
                from: 'viewers',
                localField: '_id',
                foreignField: 'comicId',
                pipeline: [
                    { $match: queryDate },
                    {
                        $group: {
                            _id: '$comicId',
                            count: { $sum: 1 },
                        },
                    },
                ],
                as: 'viewByDate',
            },
        },
        { $sort: { 'viewByDate.count': -1, totalViews: -1, createTime: -1, updateTime: -1 } },
        { $skip: DEFAULT_COMIC_PAGE_SIZE * page - DEFAULT_COMIC_PAGE_SIZE },
        { $limit: DEFAULT_COMIC_PAGE_SIZE },
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
    ]);

    return { data: comics, totalPage: Math.ceil(total / DEFAULT_COMIC_PAGE_SIZE), currentPage: page };
};

export const getComicById = async (id: string) => {
    const query = { _id: new Types.ObjectId(id) };
    const comics = await ComicsModel.aggregate([
        { $match: query },
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
    ]);

    return comics[0] || undefined;
};

export const createComic = (values: Record<string, any>): Promise<Comic> => new ComicsModel(values).save().then((comic) => comic.toObject());

export const updateComicById = (id: string, values: Record<string, any>) => ComicsModel.findByIdAndUpdate(id, values, { new: true });

export const updateThumbnailById = async (id: string, thumbnailUrl: string, thumbnailId: string) =>
    await ComicsModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: { thumbnail: thumbnailUrl, thumbnailId: thumbnailId } });

export const deleteComicById = (id: string) => ComicsModel.findByIdAndDelete(id);

export const updateTotalViewsById = (id: string) =>
    ComicsModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $inc: { totalViews: 1 } }, { new: true });

export const getTotalComics = async () => await ComicsModel.countDocuments().exec();

export const getTotalViews = async () => {
    const comics = await ComicsModel.aggregate([{ $match: {} }]);

    return comics.reduce((currentValue, comic) => currentValue + (parseInt(comic.totalViews) || 0), 0);
};
