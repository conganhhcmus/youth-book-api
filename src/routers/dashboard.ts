import { getDashboard } from '@/controllers/dashboard';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';
import { Router } from 'express';

export default (router: Router) => {
    router.get('/dashboard', verifyAccessToken, isAdmin, getDashboard);
};
