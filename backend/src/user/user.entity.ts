import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Task, (task) => task.assignee, { onDelete: 'CASCADE' })
  tasks: Task[];
}
