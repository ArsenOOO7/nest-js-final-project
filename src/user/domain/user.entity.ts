import { Column, Entity, Index } from 'typeorm';
import { Role } from './role.enum';
import { BaseEntity } from '../../common/domain/base.entity';

@Entity('app_user')
export class User extends BaseEntity {
  @Index()
  @Column({ unique: true, name: 'email' })
  email: string;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    name: 'role',
  })
  role: Role;
}
