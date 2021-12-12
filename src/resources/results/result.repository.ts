import { EntityRepository, Repository } from 'typeorm';
import Result from './result.entity';

@EntityRepository(Result)
export class ResultRepository extends Repository<Result> {
  createNew(result: Omit<Result, 'id'>) {
    return this.create(result);
  }

  getAll() {
    return this.find();
  }

  getById(id: string) {
    return this.findOne({ id });
  }

  getAllByFilmId(filmId: string) {
    return this.find({ filmId });
  }

  updatById(id: string, result: Partial<Result>) {
    return this.update({ id }, result);
  }

  deleteById(id: string) {
    return this.delete({ id });
  }
}