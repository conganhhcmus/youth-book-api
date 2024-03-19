import { Application, NextFunction, Response, Request } from 'express';
import { ApplicationError, NotFoundError } from '@/types/error';
import logger from '@/helpers/logger';
import { MongoError } from 'mongodb';
import { JsonWebTokenError } from 'jsonwebtoken';

export default function (app: Application) {
    // If you are lost
    app.use(() => {
        throw new NotFoundError('You are lost');
    });

    // Request error handler
    app.use((error: ApplicationError, _req: Request, res: Response, next: NextFunction) => {
        if (error instanceof ApplicationError) {
            logger.error(error?.message, error.stack);
            if (error.message) {
                return res.status(error.code).json(error.message);
            } else {
                return res.sendStatus(error.code);
            }
        }

        next(error);
    });

    // Log all errors
    app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
        const userString = 'unknown user';

        if (err instanceof MongoError) {
            if (err.code === 11000) {
                logger.error(`${req.method} ${req.path}: MongoDB duplicate entry from ${userString}`);
            } else {
                logger.error(`${req.method} ${req.path}: Unhandled MongoDB error ${userString}. ${err.errmsg}`);
            }

            if (!res.headersSent) {
                return res.sendStatus(500);
            }
        }
        if (err instanceof JsonWebTokenError) {
            logger.error(err?.message, err.stack);
            if (err.message) {
                return res.status(401).send(err.message);
            } else {
                return res.sendStatus(401);
            }
        } else if (err instanceof Error) {
            logger.error(`${req.method} ${req.path}: Unhandled request error ${userString}. ${err.message}`);
        } else if (typeof err === 'string') {
            logger.error(`${req.method} ${req.path}: Unhandled request error ${userString}. ${err}`);
        }

        next(err);
    });

    // Optional fallthrough error handler
    app.use(function (err: Error, _req: Request, res: Response, _next: NextFunction) {
        res.statusCode = 500;
        res.end(err.message + '\n');
    });
}
