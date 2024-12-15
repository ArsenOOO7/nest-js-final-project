import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { GroupCategory } from './group-category.enum';
import { GroupType } from './group-type.enum';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  specialtyShortName: string;
  @Column()
  academicYear: number;
  @Column()
  number: number;

  // additionally, it needs references to parent id, or have collection of groups - for SUB_GROUP & COLLECTIVE_GROUP correspondingly
  // but the logic would be a bit complicated then, so that I am not doing it now... Sorry :)
  @Column({
    type: 'enum',
    enum: GroupCategory,
  })
  category: GroupCategory;
  @Column({
    type: 'enum',
    enum: GroupType,
  })
  type: GroupType;

  @Index() // bad idea, the best - use elasticsearch for text searching purpose.
  @Column()
  name: string;
}
