import { EntityRepository, Repository } from 'typeorm';
import Director from './director.entity';

@EntityRepository(Director)
export class DirectorRepository extends Repository<Director> {
  createNew(director: Omit<Director, 'id'>) {
    return this.create(director);
  }

  getAll() {
    return this.find();
  }

  getById(id: string) {
    return this.findOne({ id });
  }

  updatById(id: string, director: Partial<Director>) {
    return this.update({ id }, director);
  }

  deleteById(id: string) {
    return this.delete({ id });
  }
}