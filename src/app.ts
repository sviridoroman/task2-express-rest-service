import express, { Request, Response, NextFunction } from 'express';

import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import directorRouter from './resources/directors/director.router';
import filmRouter from './resources/films/film.router';
import resultRouter from './resources/results/result.router';

import { notFound, successHttpLogger, errorHttpLogger, errorLogger } from './middlewares';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});


app.use(successHttpLogger);
app.use(errorHttpLogger);

app.use('/directors', directorRouter);
app.use('/films', filmRouter);
app.use('/results', resultRouter);

app.use(notFound);
app.use(errorLogger);


export default app;
