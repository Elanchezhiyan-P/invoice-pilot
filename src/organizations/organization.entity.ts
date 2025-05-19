import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column({ unique: true })
  Email: string;

  @Column()
  Address: string;

  @Column()
  PhoneNumber: string;

  @Column()
  CreatedBy: number;

  @CreateDateColumn()
  CreatedAt: Date;
}
