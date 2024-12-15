import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
