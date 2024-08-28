import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "account" })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  email: string;
  @Column('varchar')
  password: string;
  @Column('varchar')
  firstName: string;
  @Column('varchar')
  lastName: string;
}