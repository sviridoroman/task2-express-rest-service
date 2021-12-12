import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import AppError from '../../classes/appError.class';
import Film from './film.entity';
import filmsService from './film.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const { directorId } = req.params;
  const film = await filmsService.create(directorId!, req.body);
  if (!film) {
    throw new AppError('Film not create', StatusCodes.BAD_REQUEST, 'FILM_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Film.toResponse(film));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const directors = await filmsService.getAll();
  return res.status(StatusCodes.OK).json(directors.map(Film.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const film = await filmsService.getById(filmId!);
  if (!film) {
    throw new AppError('Film not found', StatusCodes.NOT_FOUND, 'FILM_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Film.toResponse(film));
});

const getAllByDirectorId = asyncHandler(async (req: Request, res: Response) => {
  const { directorId } = req.params;
  const films = await filmsService.getAllByDirectorId(directorId!);
  return res.status(StatusCodes.OK).json(films.map(Film.toResponse));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const film = await filmsService.updateById(filmId!, req.body);
  if (!film) {
    throw new AppError('Film not found', StatusCodes.NOT_FOUND, 'FILM_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(film && Film.toResponse(film));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const film = await filmsService.deleteById( filmId!);
  if (!film) {
    throw new AppError('Film not found', StatusCodes.NOT_FOUND, 'FILM_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Film.toResponse(film));
});

export default { create, getById, getAll,getAllByDirectorId,  updateById, deleteById };
