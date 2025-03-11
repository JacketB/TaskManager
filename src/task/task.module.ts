import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from '../user/user.module';  // Импортируем UserModule
import { TaskColumnModule } from '../task-column/task-column.module';
import { ProjectModule } from '../project/project.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        UserModule,  // Добавьте UserModule сюда
        TaskColumnModule,
        ProjectModule,
    ],
    providers: [TaskService],
    controllers: [TaskController],
})
export class TaskModule {}
