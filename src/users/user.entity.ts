import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  orgId: number;

  @Column()
  role: 'SuperAdmin' | 'Admin' | 'User';

  @Column()
  password: string;

  @Column()
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;
}
