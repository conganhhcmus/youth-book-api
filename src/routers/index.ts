import { Router } from 'express';
import users from './users';
import auth from './auth';
import comics from './comics';
const router = Router();

export default (): Router => {
    /** import all router */
    auth(router);
    users(router);
    comics(router);

    return router;
};
