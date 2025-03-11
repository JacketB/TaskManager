import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class TaskColumn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Task, (task) => task.column, { onDelete: 'CASCADE' })
    tasks: Task[];
}

