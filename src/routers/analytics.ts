import { getAnalytics, getAnalyticsDetails, exportAnalyticsDetails } from '@/controllers/analytics';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';
import { Router } from 'express';

export default (router: Router) => {
    // router.get('/analytics/export/:id', verifyAccessToken, isAdmin, exportAnalyticsDetails);
    router.get('/analytics/export/:id', exportAnalyticsDetails);

    router.get('/analytics/:id', verifyAccessToken, isAdmin, getAnalyticsDetails);

    router.get('/analytics', verifyAccessToken, isAdmin, getAnalytics);
};
