import { getAnalytics } from '@/controllers/analytics';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';
import { Router } from 'express';

export default (router: Router) => {
    router.get('/analytics', verifyAccessToken, isAdmin, getAnalytics);
};
