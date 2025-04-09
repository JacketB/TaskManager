import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';
import { TaskColumn } from '../task-column/task-column.entity';
import {Comment} from "../comment/comment.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    created_at: Date;

    @Column()
    dueDate: Date;

    @Column()
    priority: string;

    @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
    project: Project;

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
    assignee: User;

    @ManyToOne(() => TaskColumn, (column) => column.tasks, { onDelete: 'CASCADE' })
    column: TaskColumn;

    @OneToMany(() => Comment, (comment) => comment.task)
    comments: Comment[];

    @Column({ default: false })
    isCompleted: boolean;
}

