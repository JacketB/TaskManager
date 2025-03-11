import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskColumn } from './task-column.entity';
import { TaskColumnService } from './task-column.service';
import { TaskColumnController } from './task-column.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TaskColumn])],
    providers: [TaskColumnService],
    controllers: [TaskColumnController],
    exports: [TypeOrmModule],  // Экспортируем TypeOrmModule с TaskColumnRepository
})
export class TaskColumnModule {}
