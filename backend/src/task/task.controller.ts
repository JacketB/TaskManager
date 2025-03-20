import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую задачу' })
    @ApiResponse({ status: 201, description: 'Задача создана успешно', type: Task })
    async create(@Body() body: any): Promise<Task> {
        return this.taskService.createTask(
            body.projectId,
            body.title,
            body.description,
            body.dueDate,
            body.created_at,
            body.priority,
            body.userId,
            body.columnId,
        );
    }

    @Get()
    @ApiOperation({ summary: 'Получить все задачи' })
    @ApiResponse({ status: 200, description: 'Список задач', type: [Task] })
    async getAll(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    @Get('project/:projectId')
    @ApiOperation({ summary: 'Получить задачи по id проекта' })
    @ApiResponse({ status: 200, description: 'Список задач для проекта', type: [Task] })
    async getTasksByProjectId(@Param('id') projectId: number): Promise<Task[]> {
        return this.taskService.getTasksByProjectId(projectId);
    }
}
