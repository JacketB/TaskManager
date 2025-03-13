import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    async createProject(name: string, description: string): Promise<Project> {
        const project = new Project();
        project.name = name;
        project.description = description;
        return this.projectRepository.save(project);
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async deleteProject(id: number): Promise<void> {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Проект с ID ${id} не найден`);
        }
    }
}
