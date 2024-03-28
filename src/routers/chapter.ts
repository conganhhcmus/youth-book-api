import { Router } from 'express';
import { addChapter, deleteChapter, getAllChapter, getChapterById, getFullChapter, updateChapter } from '@/controllers/chapters';
import { getUserInfoIfLogin, verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';

export default (router: Router) => {
    router.get('/chapters/get-full', getFullChapter);

    router.get('/chapters/:id', getUserInfoIfLogin, getChapterById);

    router.post('/chapters/add', verifyAccessToken, isAdmin, addChapter);

    router.put('/chapters/:id', verifyAccessToken, isAdmin, updateChapter);

    router.delete('/chapters/:id', verifyAccessToken, isAdmin, deleteChapter);

    router.get('/chapters', getAllChapter);
};
