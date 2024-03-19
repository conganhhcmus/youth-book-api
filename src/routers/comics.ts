import {
    addComic,
    deleteComic,
    getAllComics,
    getComicInfo,
    getComicsByGenres,
    recentUpdatedComics,
    recommendComics,
    topComics,
    updateComic,
} from '@/controllers/comics';
import { Router } from 'express';
import { searchComics } from '@/controllers/comics';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';

export default (router: Router) => {
    /**
     * @swagger
     *
     * /comics/search:
     *   post:
     *     tags:
     *      - Comics
     *     description: Search comics
     *     parameters:
     *       - in: query
     *         name: page   # Note the name is the same as in the path
     *         schema:
     *           type: number
     *           example: 1
     *           minimum: 1
     *       - in: query
     *         name: q # Note the search text
     *         schema:
     *            type: string
     *            example: abc
     *
     *     responses:
     *       200:
     *         description: Success
     *
     */
    router.get('/comics/search', searchComics);

    /**
     * @swagger
     *
     * /comics/recommend:
     *   post:
     *     tags:
     *      - Comics
     *     description: Get recommend comics
     *     parameters:
     *       - in: query
     *         name: page   # Note the name is the same as in the path
     *         schema:
     *           type: number
     *           example: 1
     *           minimum: 1
     *
     *     responses:
     *       200:
     *         description: Success
     *
     */
    router.get('/comics/recommend', recommendComics);

    /**
     * @swagger
     *
     * /comics/recent-update:
     *   post:
     *     tags:
     *      - Comics
     *     description: Get recent updated comics
     *     parameters:
     *       - in: query
     *         name: page   # Note the name is the same as in the path
     *         schema:
     *           type: number
     *           example: 1
     *           minimum: 1
     *
     *     responses:
     *       200:
     *         description: Success
     *
     */
    router.get('/comics/recent', recentUpdatedComics);

    /**
     * @swagger
     *
     * /comics/top:
     *   post:
     *     tags:
     *      - Comics
     *     description: Get top comics
     *     parameters:
     *       - in: query
     *         name: page   # Note the name is the same as in the path
     *         schema:
     *           type: number
     *           example: 1
     *           minimum: 1
     *
     *     responses:
     *       200:
     *         description: Success
     *
     */
    router.get('/comics/top', topComics);

    router.get('/comics/genres', getComicsByGenres);

    router.post('/comics/add', verifyAccessToken, isAdmin, addComic);

    router.put('/comics/:id', verifyAccessToken, isAdmin, updateComic);

    router.get('/comics/:id', getComicInfo);

    router.delete('/comics/:id', verifyAccessToken, isAdmin, deleteComic);

    router.get('/comics', getAllComics);
};
