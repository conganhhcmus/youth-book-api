import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import apiRouter from '@/routers';
import errorHandler from '@/middlewares/errorHandler';
import swaggerSpec from '@/swagger';
import { PORT, ATLAS_URI, SWAGGER_CSS_URL } from '@/config';

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use(cookieParser());

/** HTTP GET Request */
app.get('/', (req: Request, res: Response) => {
    res.status(201).json('Youth Book API is running!');
});

/** api routes */
app.use('/api/v1', apiRouter());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCssUrl: SWAGGER_CSS_URL }));

/** error handlers */
errorHandler(app);

/** start server */
app.listen(PORT, () => {
    console.log(`Server connected to http://localhost:${PORT}`);
});

/** connect database */
mongoose.Promise = Promise;
mongoose.set('strictQuery', true);
mongoose.connect(ATLAS_URI);
mongoose.connection.on('error', (error: Error) => console.log(error));
