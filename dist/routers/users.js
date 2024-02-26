"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const authToken_1 = require("../middlewares/authToken");
exports.default = (router) => {
    /**
     * @swagger
     *
     * /users:
     *   get:
     *     tags:
     *      - Users
     *     description: get all users
     *
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - accessToken: []
     */
    router.get('/users', authToken_1.verifyAccessToken, authToken_1.isAdmin, users_1.getAllUserInfo);
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
     *           type: integer
     *           minimum: 1
     *
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - accessToken: []
     */
    router.get('/users/:id', authToken_1.verifyAccessToken, authToken_1.isAdminOrOwner, users_1.getUserInfo);
    /**
     * @swagger
     *
     * /users/{id}:
     *   post:
     *     tags:
     *      - Users
     *     description: Update user info
     *     parameters:
     *       - in: path
     *         name: id   # Note the name is the same as in the path
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
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
    router.put('/users/:id', authToken_1.verifyAccessToken, authToken_1.isAdminOrOwner, users_1.updateUserInfo);
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
     *           type: integer
     *           minimum: 1
     *
     *     responses:
     *       200:
     *         description: Success
     *     security:
     *       - accessToken: []
     */
    router.delete('/users/:id', authToken_1.verifyAccessToken, authToken_1.isAdmin, users_1.deleteUserById);
};
//# sourceMappingURL=users.js.map