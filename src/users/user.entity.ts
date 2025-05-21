import { Invoice } from 'src/invoices/invoices.entity';
import { Organization } from 'src/organizations/organization.entity';
import { Role } from 'src/role/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
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

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orgId' })
  organization: Organization;

  @Column({ type: 'int', unsigned: true })
  roleId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column()
  password: string;

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];

  @Column()
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;
}
