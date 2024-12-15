import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/domain/base.entity';

@Entity()
export class Subject extends BaseEntity {
  @Column({ name: 'name' })
  name: string;
}
