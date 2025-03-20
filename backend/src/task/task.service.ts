import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';
import { TaskColumn } from '../task-column/task-column.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(TaskColumn)
        private taskColumnRepository: Repository<TaskColumn>,
    ) {}

    async createTask(
        projectId: number,
        title: string,
        description: string,
        dueDate: Date,
        created_at: Date,
        priority: string,
        userId: number,
        columnId: number,
    ): Promise<Task> {
        const project = await this.projectRepository.findOne({ where: { id: projectId } });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const column = await this.taskColumnRepository.findOne({ where: { id: columnId } });

        if (!project) {
            throw new NotFoundException(`Проект с id ${projectId} не найден`);
        }
        if (!user) {
            throw new NotFoundException(`Пользователь с id ${userId} не найден`);
        }
        if (!column) {
            throw new NotFoundException(`Колонка с id ${columnId} не найдена`);
        }

        const task = new Task();
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.created_at = created_at;
        task.priority = priority;
        task.project = project;
        task.assignee = user;
        task.column = column;

        return this.taskRepository.save(task);
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async getTasksByProjectId(projectId: number): Promise<Task[]> {
        const project = await this.projectRepository.findOne({ where: { id: projectId } });

        if (!project) {
            throw new NotFoundException(`Проект с id ${projectId} не найден`);
        }

        // Получаем все задачи, связанные с проектом
        return this.taskRepository.find({ where: { project: { id: projectId } }, relations: ['column', 'assignee'] });
    }
}
