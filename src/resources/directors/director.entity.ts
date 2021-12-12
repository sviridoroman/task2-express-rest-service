import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'directors' })
class Director {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  name: string = 'name';

  @Column('varchar')
  surname: string= 'surname';

  @Column('varchar')
  country: string= 'country';

  @Column('varchar')
  birthday: string= '2000';

  static toResponse({ id, name, surname, country, birthday}: Director) {
    return { id, name, surname, country, birthday};
  }
}

export default Director;
