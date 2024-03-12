import ChapterModel from '@/models/chapter';
import { ChapterResponse } from '@/types/chapter';

export const createChapter = (values: Record<string, any>): Promise<ChapterResponse> =>
    new ChapterModel(values).save().then((chapter) => chapter.toObject());

export const updateChapterById = (id: string, values: Record<string, any>) => ChapterModel.findByIdAndUpdate(id, values, { new: true });
