import { AnalyticsData, AnalyticsDetail, AnalyticsDetailData } from '@/types/analytics';
import * as viewerRepository from '@/repositories/viewer';

export const getAnalytics = async (query: string, page: number, type: number): Promise<AnalyticsData> => {
    const result = await viewerRepository.getViewerGroupByUserId(query, page, type);

    return result;
};

export const getAnalyticsDetail = async (userId: string, query: string, page: number, type: number): Promise<AnalyticsDetailData> => {
    const result = await viewerRepository.getViewerDetailByUserId(userId, query, page, type);

    return result;
};

export const exportAnalyticsDetail = async (userId: string, type: number): Promise<AnalyticsDetail[]> => {
    const result = await viewerRepository.exportViewerDetailByUserId(userId, type);

    return result;
};
