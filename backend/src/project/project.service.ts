import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    async createProject(name: string): Promise<Project> {
        const project = new Project();
        project.name = name;
        return this.projectRepository.save(project);
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.find();
    }
}
