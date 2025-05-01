import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Account } from './account.entity'

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column('varchar')
  firstName: string;
  @Column('varchar')
  lastName: string;
  @Column({unique: true, type: 'varchar'})
  email: string;
  @Column('varchar')
  password: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @JoinTable()
  @OneToMany(() => Account, (account) => account.user, { cascade: true })
  accounts: Account[]
}