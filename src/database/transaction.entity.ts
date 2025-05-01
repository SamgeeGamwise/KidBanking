import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Account } from './account.entity'

@Entity({ name: "transaction" })
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column('integer')
  amount: number;
  @Column('varchar')
  name: string;
  @Column('varchar')
  memo: string;
  @Column('date')
  date: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account  
}