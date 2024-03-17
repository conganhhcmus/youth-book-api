import { Router } from 'express';
import users from './users';
import auth from './auth';
import comics from './comics';
import chapter from './chapter';
import genres from './genres';
import payment from './payment';
import dashboard from './dashboard';
const router = Router();

export default (): Router => {
    /** import all router */
    dashboard(router);
    auth(router);
    users(router);
    comics(router);
    chapter(router);
    genres(router);
    payment(router);

    return router;
};
