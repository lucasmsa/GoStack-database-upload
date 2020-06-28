import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne, UpdateDateColumn} from 'typeorm'
import Category from './Category'

@Entity('transactions')
export default class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column()
  value: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
