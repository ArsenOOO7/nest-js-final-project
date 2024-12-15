import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Role } from './role.enum';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  email: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;
}
