import { Router } from 'express';
import users from './users';
import auth from './auth';
const router = Router();

export default (): Router => {
    /** import all router */
    auth(router);
    users(router);

    return router;
};
