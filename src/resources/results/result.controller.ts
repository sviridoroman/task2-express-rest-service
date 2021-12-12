import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import AppError from '../../classes/appError.class';
import Result from './result.entity';
import resultService from './result.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const film = await resultService.create(filmId!, req.body);
  if (!film) {
    throw new AppError('Result not create', StatusCodes.BAD_REQUEST, 'RESULT_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Result.toResponse(film));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const directors = await resultService.getAll();
  return res.status(StatusCodes.OK).json(directors.map(Result.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { resultId } = req.params;
  const film = await resultService.getById(resultId!);
  if (!film) {
    throw new AppError('Result not found', StatusCodes.NOT_FOUND, 'RESULT_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Result.toResponse(film));
});

const getAllByFilmId = asyncHandler(async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const films = await resultService.getAllByFilmId(filmId!);
  return res.status(StatusCodes.OK).json(films.map(Result.toResponse));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { resultId } = req.params;
  const film = await resultService.updateById(resultId!, req.body);
  if (!film) {
    throw new AppError('Result not found', StatusCodes.NOT_FOUND, 'RESULT_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(film && Result.toResponse(film));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { resultId } = req.params;
  const film = await resultService.deleteById(resultId!);
  if (!film) {
    throw new AppError('Result not found', StatusCodes.NOT_FOUND, 'RESULT_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Result.toResponse(film));
});

export default { create, getAll,getAllByFilmId, getById, updateById, deleteById };
