import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from './user.entity'
import { Transaction } from './transaction.entity';

@Entity({ name: "account" })
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column('varchar')
  name: string;
  @Column('varchar')
  number: string;
  @Column('smallint')
  interest: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User  

  @JoinTable()
  @OneToMany(() => Transaction, (transaction) => transaction, { cascade: true })
  transactions: Transaction[]
}