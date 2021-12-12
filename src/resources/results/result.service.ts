import { getCustomRepository } from 'typeorm';
import Result from './result.entity';

import { ResultRepository } from './result.repository';


const create = async (filmId: string, payload: Omit<Result, 'id'>): Promise<Result> => {
  const resultRepository = getCustomRepository(ResultRepository);
  const resultCreatable = { ...payload, filmId };
  const result = resultRepository.createNew(resultCreatable);
  return resultRepository.save(result);

};

const getAll = async (): Promise<Result[]> => {
  const resultRepository = getCustomRepository(ResultRepository);
  return resultRepository.getAll()
};

const getById = async (id: string ): Promise<Result | null> => {
  const resultRepository = getCustomRepository(ResultRepository);
  const result = await resultRepository.getById(id);
  if (!result) return null;
  return result;
};

const getAllByFilmId = async (filmId: string): Promise<Result[]> => {
  const resultRepository = getCustomRepository(ResultRepository);
  return resultRepository.getAllByFilmId(filmId);
};

const updateById =  async (id: string, payload: Partial<Result>): Promise<Result | null> =>{
  const resultRepository = getCustomRepository(ResultRepository);
  await resultRepository.updatById(id,payload);
  const result = await resultRepository.getById(id);
  if (!result) return null;
  return result;
};
  
const deleteById = async (id: string): Promise<Result | null> => {
  const resultRepository = getCustomRepository(ResultRepository);
   const resultDeleted = await resultRepository.getById(id);
  if (!resultDeleted) return null; 
  await resultRepository.deleteById(id);
  return resultDeleted;
 };

export default { create, getAll, getAllByFilmId, getById, updateById, deleteById };
