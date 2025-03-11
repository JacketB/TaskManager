import { Controller, Post, Body, Get } from '@nestjs/common';
import { TaskColumnService } from './task-column.service';
import { TaskColumn } from './task-column.entity';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('TaskColumns')
@Controller('task-columns')
export class TaskColumnController {
    constructor(private readonly taskColumnService: TaskColumnService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую колонку' })
    @ApiResponse({ status: 201, description: 'Колонка создана успешно', type: TaskColumn })
    async create(@Body() body: { name: string }): Promise<TaskColumn> {
        return this.taskColumnService.createColumn(body.name);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все колонки' })
    @ApiResponse({ status: 200, description: 'Список колонок', type: [TaskColumn] })
    async getAll(): Promise<TaskColumn[]> {
        return this.taskColumnService.getAllColumns();
    }
}
