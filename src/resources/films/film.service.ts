import { getCustomRepository } from 'typeorm';
import Film from './film.entity';

import { FilmRepository } from './film.repository';
import { ResultRepository } from '../results/result.repository';


const create = async (directorId: string, payload: Omit<Film, 'id'>): Promise<Film> => {
  const filmRepository = getCustomRepository(FilmRepository);
  const filmCreatable = { ...payload, directorId };
  const film = filmRepository.createNew(filmCreatable);
  return filmRepository.save(film);

};

const getAll = async (): Promise<Film[]> => {
  const filmRepository = getCustomRepository(FilmRepository);
  return filmRepository.getAll()
};

const getById = async (id: string ): Promise<Film | null> => {
  const filmRepository = getCustomRepository(FilmRepository);
  const film = await filmRepository.getById(id);
  if (!film) return null;
  return film;
};

const getAllByDirectorId = async (directorId: string): Promise<Film[]> => {
  const filmRepository = getCustomRepository(FilmRepository);
  return filmRepository.getAllByDirectorId(directorId);
};

const updateById =  async (id: string, payload: Partial<Film>): Promise<Film | null> =>{
  const filmRepository = getCustomRepository(FilmRepository);
  await filmRepository.updatById(id,payload);
  const film = await filmRepository.getById(id);
  if (!film) return null;
  return film;
};
  
const deleteById = async (id: string): Promise<Film | null> => {
  const filmRepository = getCustomRepository(FilmRepository);
   const directorDeleted = await filmRepository.getById(id);
  
  if (!directorDeleted) return null; 
  await filmRepository.deleteById(id);
  const resultRepository = getCustomRepository(ResultRepository);
  await resultRepository.update({ filmId: id }, { filmId: null });
  return directorDeleted;
 };

export default { create, getAll, getAllByDirectorId, getById, updateById, deleteById };
