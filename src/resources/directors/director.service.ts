import { getCustomRepository } from 'typeorm';
import Director from './director.entity';

import { DirectorRepository } from './director.repository';
import { FilmRepository } from '../films/film.repository';

const create = async (payload: Omit<Director, 'id'>): Promise<Director> => {
  const directorRepository = getCustomRepository(DirectorRepository);
  const user = directorRepository.createNew(payload);
  return directorRepository.save(user);
};

const getAll = async (): Promise<Director[]> => {
  const directorRepository = getCustomRepository(DirectorRepository);
  return directorRepository.getAll()
};

const getById = async (id: string ): Promise<Director | null> => {
  const directorRepository = getCustomRepository(DirectorRepository);
  const director = await directorRepository.getById(id);
  if (!director) return null;
  return director;
};

const updateById =  async (id: string, payload: Partial<Director>): Promise<Director | null> =>{
  const directorRepository = getCustomRepository(DirectorRepository);
  await directorRepository.updatById(id,payload);
  const director = await directorRepository.getById(id);
  if (!director) return null;
  return director;
};
  
const deleteById = async (id: string): Promise<Director | null> => {
  const directorRepository = getCustomRepository(DirectorRepository);
   const directorDeleted = await directorRepository.getById(id);
  
  if (!directorDeleted) return null; 
  await directorRepository.deleteById(id);
  const filmRepository = getCustomRepository(FilmRepository);
  await filmRepository.update({ directorId: id }, { directorId: null });
  return directorDeleted;
 };

export default { create, getAll, getById, updateById, deleteById };
