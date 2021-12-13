import express, { Request, Response, NextFunction } from 'express';

import directorRouter from './resources/directors/director.router';
import filmRouter from './resources/films/film.router';
import resultRouter from './resources/results/result.router';
import authRouter from './resources/auth/auth.router';
import userRouter from './resources/users/user.router';

import { notFound, authentication ,successHttpLogger, errorHttpLogger, errorLogger } from './middlewares';

const app = express();
app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});


app.use(successHttpLogger);
app.use(errorHttpLogger);

app.use('/', authRouter);
app.use('/users', authentication, userRouter);
app.use('/directors',authentication, directorRouter);
app.use('/films',authentication, filmRouter);
app.use('/results',authentication, resultRouter);

app.use(notFound);
app.use(errorLogger);


export default app;
