import { Router } from 'express';
import users from './users';
import auth from './auth';
import comics from './comics';
import chapter from './chapter';
import genres from './genres';
import payment from './payment';
const router = Router();

export default (): Router => {
    /** import all router */
    auth(router);
    users(router);
    comics(router);
    chapter(router);
    genres(router);
    payment(router);

    return router;
};
