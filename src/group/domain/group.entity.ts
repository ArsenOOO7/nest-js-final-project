import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { GroupCategory } from './group-category.enum';
import { GroupType } from './group-type.enum';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'specialty_short_name' })
  specialtyShortName: string;
  @Column({ name: 'academic_year' })
  academicYear: number;
  @Column({ name: 'number' })
  number: number;

  // additionally, it needs references to parent id, or have collection of groups - for SUB_GROUP & COLLECTIVE_GROUP correspondingly
  // but the logic would be a bit complicated then, so that I am not doing it now... Sorry :)
  @Column({
    type: 'enum',
    enum: GroupCategory,
    name: 'category',
  })
  category: GroupCategory;
  @Column({
    type: 'enum',
    enum: GroupType,
    name: 'type',
  })
  type: GroupType;

  @Index() // bad idea, the best - use elasticsearch for text searching purpose.
  @Column({ name: 'name' })
  name: string;
}
