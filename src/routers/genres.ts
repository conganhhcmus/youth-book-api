import { Router } from 'express';
import { addGenres, deleteGenres, getAllGenres, getGenresById, updateGenres } from '@/controllers/genres';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';

export default (router: Router) => {
    router.get('/genres/:id', getGenresById);

    router.post('/genres/add', verifyAccessToken, isAdmin, addGenres);

    router.put('/genres/:id', verifyAccessToken, isAdmin, updateGenres);

    router.delete('/genres/:id', verifyAccessToken, isAdmin, deleteGenres);

    router.get('/genres', getAllGenres);
};
