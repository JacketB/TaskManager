import {Controller, Post, Body, Get, Delete, Param, ParseIntPipe} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Projects')  // Тег для группировки
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('new')
    @ApiOperation({ summary: 'Создать новый проект' })
    @ApiResponse({ status: 201, description: 'Проект создан успешно', type: Project })
    async create(@Body() body: { name: string, description: string }): Promise<Project> {
        return this.projectService.createProject(body.name, body.description);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все проекты' })
    @ApiResponse({ status: 200, description: 'Список проектов', type: [Project] })
    async getAll(): Promise<Project[]> {
        return this.projectService.getAllProjects();
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Удалить проект по ID' })
    @ApiResponse({ status: 200, description: 'Проект удален успешно' })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    async deleteProject(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        await this.projectService.deleteProject(id);
        return { message: `Проект с ID ${id} удалён` };
    }
}
