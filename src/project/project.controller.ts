import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Projects')  // Тег для группировки
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новый проект' })
    @ApiResponse({ status: 201, description: 'Проект создан успешно', type: Project })
    async create(@Body() body: { name: string }): Promise<Project> {
        return this.projectService.createProject(body.name);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все проекты' })
    @ApiResponse({ status: 200, description: 'Список проектов', type: [Project] })
    async getAll(): Promise<Project[]> {
        return this.projectService.getAllProjects();
    }
}
