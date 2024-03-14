import { Router } from 'express';
import { addChapter, deleteChapter, getAllChapter, getChapterById, updateChapter } from '@/controllers/chapters';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';

export default (router: Router) => {
    router.get('/chapters/:id', getChapterById);

    router.post('/chapters/add', verifyAccessToken, isAdmin, addChapter);

    router.put('/chapters/:id', verifyAccessToken, isAdmin, updateChapter);

    router.delete('/chapters/:id', verifyAccessToken, isAdmin, deleteChapter);

    router.get('/chapters', getAllChapter);
};
