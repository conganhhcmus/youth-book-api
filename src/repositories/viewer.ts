import ViewerModel from '@/models/viewer';
import { ViewerResponse } from '@/types/viewer';

export const addViewer = (values: Record<string, any>): Promise<ViewerResponse> => new ViewerModel(values).save().then((viewer) => viewer.toObject());

export const updateViewer = async (values: Record<string, any>) =>
    await ViewerModel.updateOne({ ...values }, { $set: { ...values } }, { upsert: true });
