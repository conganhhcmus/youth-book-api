import { AnalyticsData } from '@/types/analytics';
import * as viewerRepository from '@/repositories/viewer';

export const getAnalytics = async (query: string, page: number, type: number): Promise<AnalyticsData> => {
    const result = await viewerRepository.getViewerGroupByUserId(query, page, type);

    return result;
};
