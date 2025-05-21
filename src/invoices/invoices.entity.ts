import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceItem } from './invoicesitem.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoiceNumber: string;

  @Column()
  month: string;

  @Column('decimal')
  subtotal: number;

  @Column('decimal')
  discount: number;

  @Column('decimal')
  taxRate: number;

  @Column('decimal')
  totalTax: number;

  @Column('decimal')
  totalDue: number;

  @Column({ default: 0 })
  shipping: number;

  @Column()
  remarks: string;

  @ManyToOne(() => User, (user) => user.invoices, { eager: true })
  user: User;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];

  @CreateDateColumn()
  createdAt: Date;
}
