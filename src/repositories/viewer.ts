import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import ViewerModel from '@/models/viewer';
import { Analytics, AnalyticsData } from '@/types/analytics';
import { ViewerResponse } from '@/types/viewer';
import moment from 'moment';

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
