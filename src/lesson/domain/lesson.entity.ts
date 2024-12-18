import { Column, Entity, Index, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/domain/user.entity';
import { JoinColumn, JoinTable } from 'typeorm';
import { Subject } from '../../subject/domain/subject.entity';
import { Group } from '../../group/domain/group.entity';
import { LessonType } from './lesson-type.enum';
import { BaseEntity } from '../../common/domain/base.entity';

@Entity()
export class Lesson extends BaseEntity {
  @Index()
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'teacher_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'lesson_fk1',
  })
  teacher: User;
  @Index()
  @ManyToOne(() => Subject, { eager: true })
  @JoinColumn({
    name: 'subject_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'lesson_fk2',
  })
  subject: Subject;
  @ManyToMany(() => Group, { eager: true })
  @JoinTable({
    name: 'lesson_group',
  })
  groups: Group[];

  // @Index()
  // @Column({ name: 'teacher_id' })
  // teacherId: string;
  // @Index()
  // @Column({ name: 'subject_id' })
  // subjectId: string;

  @Column({ name: 'number' })
  number: number;
  @Column({ name: 'lesson_date', type: 'timestamp' })
  lessonDate: Date;
  @Column({ name: 'location_name' })
  locationName: string;
  @Column({
    type: 'enum',
    enum: LessonType,
    name: 'type',
  })
  type: LessonType;
}
