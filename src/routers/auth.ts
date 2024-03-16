import { Router } from 'express';
import { fetchInfo, login, register, resetPassword, resetToken } from '@/controllers/auth';
import { verifyAccessToken, verifyRefreshToken } from '@/middlewares/authToken';
import { isAdminOrOwner } from '@/middlewares/usersValidation';

export default (router: Router) => {
    /**
     * @swagger
     *
     * /register:
     *   post:
     *     tags:
     *      - Auth
     *     description: Create a new user
     *     requestBody:
     *      required: true
     *      description: Create a new user
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              username:
     *                type: string
     *                example: admin
     *              password:
     *                type: string
     *                example: admin
     *              role:
     *                type: number
     *                example: 1
     *            required:
     *              - username
     *              - password
     *
     *     responses:
     *       201:
     *         description: Success
     *
     */
    router.post('/register', register);

    /**
     * @swagger
     *
     * /login:
     *   post:
     *     tags:
     *      - Auth
     *     description: Login
     *     requestBody:
     *      required: true
     *      description: Login
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              username:
     *                type: string
     *                example: admin
     *              password:
     *                type: string
     *                example: admin
     *            required:
     *              - username
     *              - password
     *
     *     responses:
     *       200:
     *         description: Success
     *         headers:
     *           Set-Cookie:
     *             schema:
     *               type: string
     *               example: ACCESS_TOKEN=abcde12345; Path=/; HttpOnly, REFRESH_TOKEN=abcde12345; Path=/; HttpOnly
     *
     */
    router.post('/login', login);

    /**
     * @swagger
     *
     * /reset-token:
     *   get:
     *     tags:
     *      - Auth
     *     description: reset-token
     *
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - refreshToken: []
     */
    router.get('/reset-token', verifyRefreshToken, resetToken);

    /**
     * @swagger
     *
     * /reset-password/{id}:
     *   post:
     *     tags:
     *      - Auth
     *     description: Reset password
     *     parameters:
     *       - in: path
     *         name: id   # Note the name is the same as in the path
     *         required: true
     *         schema:
     *           type: string
     *           example: 65db6debc7683009ffad79bc
     *     requestBody:
     *      required: true
     *      description: Reset password
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              username:
     *                type: string
     *                example: admin
     *              password:
     *                type: string
     *                example: admin
     *              newPassword:
     *                type: string
     *                example: admin
     *            required:
     *              - username
     *              - password
     *              - newPassword
     *
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - accessToken: []
     */
    router.post('/reset-password/:id', verifyAccessToken, isAdminOrOwner, resetPassword);

    router.get('/fetch-info', verifyAccessToken, fetchInfo);
};
