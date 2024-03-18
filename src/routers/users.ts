import { Router } from 'express';
import { deleteUserById, getAllUser, getUserById, updateAvatarById, updateStatusById, updateUserById } from '@/controllers/users';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin, isAdminOrOwner } from '@/middlewares/usersValidation';
import { multerUpload } from '@/middlewares/uploadFile';

export default (router: Router) => {
    /**
     * @swagger
     *
     * /users:
     *   get:
     *     tags:
     *      - Users
     *     description: get all users
     *     parameters:
     *       - in: query
     *         name: page   # Note the name is the same as in the path
     *         schema:
     *           type: number
     *           example: 1
     *           minimum: 1
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - accessToken: []
     */
    router.get('/users', verifyAccessToken, isAdmin, getAllUser);

    /**
     * @swagger
     *
     * /users/{id}:
     *   get:
     *     tags:
     *      - Users
     *     description: Get user info
     *     parameters:
     *       - in: path
     *         name: id   # Note the name is the same as in the path
     *         required: true
     *         schema:
     *           type: string
     *           example: 65db6debc7683009ffad79bc
     *
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - accessToken: []
     */
    router.get('/users/:id', verifyAccessToken, isAdminOrOwner, getUserById);

    /**
     * @swagger
     *
     * /users/{id}:
     *   put:
     *     tags:
     *      - Users
     *     description: Update user info
     *     parameters:
     *       - in: path
     *         name: id   # Note the name is the same as in the path
     *         required: true
     *         schema:
     *           type: string
     *           example: 65db6debc7683009ffad79bc
     *     requestBody:
     *      required: true
     *      description: Update user info
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              username:
     *                type: string
     *                example: admin
     *              email:
     *                type: string
     *                example: admin@gmail.com
     *              fullName:
     *                type: string
     *                example: admin
     *              role:
     *                type: number
     *                example: 1
     *            required:
     *              - username
     *
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - accessToken: []
     */
    router.put('/users/:id', verifyAccessToken, isAdminOrOwner, updateUserById);

    /**
     * @swagger
     *
     * /users/{id}:
     *   delete:
     *     tags:
     *      - Users
     *     description: Get user info
     *     parameters:
     *       - in: path
     *         name: id   # Note the name is the same as in the path
     *         required: true
     *         schema:
     *           type: string
     *           example: 65db6debc7683009ffad79bc
     *
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - accessToken: []
     */
    router.delete('/users/:id', verifyAccessToken, isAdmin, deleteUserById);

    router.post('/update-avatar/:id', verifyAccessToken, isAdminOrOwner, multerUpload.single('file'), updateAvatarById);

    router.post('/update-status/:id', verifyAccessToken, isAdmin, updateStatusById);
};
