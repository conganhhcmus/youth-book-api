import { Router } from 'express';
import { addChapter } from '@/controllers/chapters';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';

export default (router: Router) => {
    router.post('/chapters/add', verifyAccessToken, isAdmin, addChapter);

    router.put('/chapters/:id', verifyAccessToken, isAdmin, addChapter);

    router.delete('/chapters/:id', verifyAccessToken, isAdmin, addChapter);
};
