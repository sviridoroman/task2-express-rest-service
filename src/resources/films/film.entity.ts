import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'films' })
class Film {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title: string = 'title';

  @Column('integer')
  price: number = 0;

  @Column('varchar')
  genre: string= 'genre';

  @Column('integer')
  year: number = 2000;

  @Column('varchar', { length: 36, nullable: true })
  directorId!: string | null;

  static toResponse(film: Omit<Film, 'id'>) {
    return film;
  }
}

export default Film;
