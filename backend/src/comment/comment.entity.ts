import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @Column({ nullable: true })
    filePath?: string;

    @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
    task: Task;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'SET NULL', nullable: true })
    author: User;
}
