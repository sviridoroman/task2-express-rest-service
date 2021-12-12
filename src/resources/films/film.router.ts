import { Router } from 'express';

import FilmController from './film.controller';
import FilmValidator from './film.validator';


import { validate } from '../../middlewares';

const router = Router();

router
  .route('/:filmId')
  .get(FilmValidator.getById(), validate,  FilmController.getById)
  .put(FilmValidator.updateById(), validate, FilmController.updateById)
  .delete(FilmValidator.deleteById(), validate, FilmController.deleteById);

router
  .route('/')
  .get(FilmController.getAll);

router
  .route('/:directorId/films')
  .post(FilmValidator.create(), validate, FilmController.create)
  .get(FilmValidator.getAllByDirectorId(), validate, FilmController.getAllByDirectorId);
  

export default router;
