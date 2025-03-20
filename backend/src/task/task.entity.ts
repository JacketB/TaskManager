import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';
import { TaskColumn } from '../task-column/task-column.entity';

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

    @Column({ default: false })
    isCompleted: boolean;
}

