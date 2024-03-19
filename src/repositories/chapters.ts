import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import ChapterModel from '@/models/chapter';
import { ChapterResponse } from '@/types/chapter';
import { Types } from 'mongoose';

export const createChapter = (values: Record<string, any>): Promise<ChapterResponse> =>
    new ChapterModel(values).save().then((chapter) => chapter.toObject());

export const updateChapterById = (id: string, values: Record<string, any>) => ChapterModel.findByIdAndUpdate(id, values, { new: true });

export const deleteChapterByComicId = (comicId: string) => ChapterModel.deleteMany({ comicId: comicId });

export const deleteChapterById = (id: string) => ChapterModel.findByIdAndDelete(id);

export const getAllChapterByComicId = async (page: number, q: string, comicId: string) => {
    const query = !!q
        ? { name: { $regex: '.*' + q + '.*', $options: 'i' }, comicId: new Types.ObjectId(comicId) }
        : { comicId: new Types.ObjectId(comicId) };
    const total = await ChapterModel.countDocuments(query).exec();
    const chapter = await ChapterModel.find(query)
        .skip(DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE)
        .limit(DEFAULT_PAGE_SIZE);

    return { data: chapter, totalPage: Math.ceil(total / DEFAULT_PAGE_SIZE), currentPage: page };
};

export const getChapterById = (id: string) => ChapterModel.findById(id);
