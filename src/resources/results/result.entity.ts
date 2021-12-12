import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'results' })
class Result {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  country: string = 'country';

  @Column('varchar')
  proceeds: string = '0';

  @Column('varchar')
  views: string= '0';

  @Column('varchar', { length: 36, nullable: true })
  filmId!: string | null;

  static toResponse(result: Omit<Result, 'id'>) {
    return result;
  }
}

export default Result;
