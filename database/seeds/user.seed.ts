import { Factory, Seeder } from 'typeorm-seeding';
import User from '../../src/resources/users/user.entity';

export default class CreatePets implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create();
  }
}
