import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import ViewerModel from '@/models/viewer';
import { Analytics, AnalyticsData, AnalyticsDetail, AnalyticsDetailData } from '@/types/analytics';
import { ViewerResponse } from '@/types/viewer';
import moment from 'moment';
import { Types } from 'mongoose';

export const addViewer = (values: Record<string, any>): Promise<ViewerResponse> => new ViewerModel(values).save().then((viewer) => viewer.toObject());

export const updateViewer = async (values: Record<string, any>) =>
    await ViewerModel.updateOne({ ...values }, { $set: { ...values } }, { upsert: true });

export const getViewerGroupByUserId = async (q: string, page: number, type: number): Promise<AnalyticsData> => {
    const date = moment().utc().endOf('day').subtract(type, 'days').toDate();
    const queryTime = type !== 0 ? { createTime: { $gt: date } } : {};
    const query = !!q ? { username: { $regex: '.*' + q + '.*', $options: 'i' } } : {};

    const allViewerGroupList = await ViewerModel.aggregate([
        { $match: queryTime },
        {
            $group: {
                _id: '$userId',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $set: {
                username: { $arrayElemAt: ['$users.username', 0] },
            },
        },
        { $match: query },
    ]);

    const viewerGroupList = await ViewerModel.aggregate([
        { $match: queryTime },
        {
            $group: {
                _id: '$userId',
                chapters: { $push: '$chapterId' },
                comics: { $push: '$comicId' },
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $set: {
                username: { $arrayElemAt: ['$users.username', 0] },
            },
        },
        { $match: query },
        { $sort: { username: -1 } },
        { $skip: DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE },
        { $limit: DEFAULT_PAGE_SIZE },
    ]);

    const result = viewerGroupList.map(
        (e) =>
            ({
                userId: e._id,
                username: e.username || '-',
                totalViewChapter: e.chapters.length,
                totalViewComic: e.comics.length,
            }) as Analytics,
    );

    return { data: result, totalPage: Math.ceil(allViewerGroupList.length / DEFAULT_PAGE_SIZE), currentPage: page } as AnalyticsData;
};

export const getViewerDetailByUserId = async (userId: string, q: string, page: number, type: number): Promise<AnalyticsDetailData> => {
    const queryUser = userId !== 'get-all' ? { userId: new Types.ObjectId(userId) } : {};
    const date = moment().utc().endOf('day').subtract(type, 'days').toDate();
    const queryTime = type !== 0 ? { createTime: { $gt: date } } : {};
    const query = !!q ? { comicName: { $regex: '.*' + q + '.*', $options: 'i' } } : {};

    const allViewerGroupList = await ViewerModel.aggregate([
        { $match: queryUser },
        { $match: queryTime },
        {
            $lookup: {
                from: 'comics',
                localField: 'comicId',
                foreignField: '_id',
                as: 'comics',
            },
        },
        {
            $set: {
                comicName: { $arrayElemAt: ['$comics.name', 0] },
            },
        },
        { $match: query },
    ]);

    const viewerGroupList = await ViewerModel.aggregate([
        { $match: queryUser },
        { $match: queryTime },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $set: {
                username: { $arrayElemAt: ['$users.username', 0] },
            },
        },
        {
            $lookup: {
                from: 'comics',
                localField: 'comicId',
                foreignField: '_id',
                as: 'comics',
            },
        },
        {
            $set: {
                comicName: { $arrayElemAt: ['$comics.name', 0] },
            },
        },
        { $match: query },
        {
            $lookup: {
                from: 'chapters',
                localField: 'chapterId',
                foreignField: '_id',
                as: 'chapters',
            },
        },
        {
            $set: {
                chapterName: { $arrayElemAt: ['$chapters.name', 0] },
            },
        },
        { $sort: { username: -1, comicName: -1 } },
        { $skip: DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE },
        { $limit: DEFAULT_PAGE_SIZE },
    ]);

    const result = viewerGroupList.map(
        (e) =>
            ({
                userId: e._id,
                username: e.username || '-',
                comicName: e.comicName,
                chapterName: e.chapterName,
                createTime: e.createTime,
            }) as AnalyticsDetail,
    );

    return { data: result, totalPage: Math.ceil(allViewerGroupList.length / DEFAULT_PAGE_SIZE), currentPage: page } as AnalyticsDetailData;
};

export const exportViewerDetailByUserId = async (userId: string, type: number): Promise<AnalyticsDetail[]> => {
    const queryUser = userId !== 'get-all' ? { userId: new Types.ObjectId(userId) } : {};
    const date = moment().utc().endOf('day').subtract(type, 'days').toDate();
    const queryTime = type !== 0 ? { createTime: { $gt: date } } : {};

    const viewerGroupList = await ViewerModel.aggregate([
        { $match: queryUser },
        { $match: queryTime },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $set: {
                username: { $arrayElemAt: ['$users.username', 0] },
            },
        },
        {
            $lookup: {
                from: 'comics',
                localField: 'comicId',
                foreignField: '_id',
                as: 'comics',
            },
        },
        {
            $set: {
                comicName: { $arrayElemAt: ['$comics.name', 0] },
            },
        },
        {
            $lookup: {
                from: 'chapters',
                localField: 'chapterId',
                foreignField: '_id',
                as: 'chapters',
            },
        },
        {
            $set: {
                chapterName: { $arrayElemAt: ['$chapters.name', 0] },
            },
        },
        { $sort: { username: -1, comicName: -1 } },
    ]);

    const result = viewerGroupList.map(
        (e) =>
            ({
                userId: e._id,
                username: e.username || '-',
                comicName: e.comicName,
                chapterName: e.chapterName,
                createTime: e.createTime,
            }) as AnalyticsDetail,
    );

    return result;
};
