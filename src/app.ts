import express, { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'express-async-errors';
import connect from './database/conn';

dotenv.config();
const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

/** HTTP GET Request */
app.get('/', (req: Request, res: Response) => {
    res.status(201).json('Youth Book API is running!');
});

/** api routes */

/** error handlers */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};
app.use(errorHandler);

const port = process.env.PORT || 8080;

/** start server only when we have valid connection */
connect()
    .then(() => {
        try {
            app.listen(port, () => {
                console.log(`Server connected to http://localhost:${port}`);
            });
        } catch (error) {
            console.log('Cannot connect to the server');
        }
    })
    .catch((error) => {
        console.log('Invalid database connection...!');
    });
