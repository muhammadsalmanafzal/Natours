import express from 'express';
import morgan from 'morgan';

import { tourRouter } from './routes/tourRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { AppError } from './utils/appError.js';
import { routeError } from './controllers/errorController.js';

const app = express();

// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
// }

app.use(express.json());
app.use(express.static('./starter/public/'));

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

// * mounting the above made seperate routers as middlewares
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// * handeling the routes that are not available

app.all('*', (req, res, next) => {
  next(new AppError(`unable to find ${req.originalUrl}`, 404));
});

app.use(routeError);
export { app };
