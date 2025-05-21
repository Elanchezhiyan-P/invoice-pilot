import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { RoleName } from './role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleName, unique: true })
  name: RoleName;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
