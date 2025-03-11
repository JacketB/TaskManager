import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskColumn } from './task-column.entity';

@Injectable()
export class TaskColumnService {
    constructor(
        @InjectRepository(TaskColumn)
        private taskColumnRepository: Repository<TaskColumn>,
    ) {}

    async createColumn(name: string): Promise<TaskColumn> {
        const column = new TaskColumn();
        column.name = name;
        return this.taskColumnRepository.save(column);
    }

    async getAllColumns(): Promise<TaskColumn[]> {
        return this.taskColumnRepository.find();
    }
}
