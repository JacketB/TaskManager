import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { TaskColumnModule } from './task-column/task-column.module';
import { Project } from './project/project.entity';
import { Task } from './task/task.entity';
import { User } from './user/user.entity';
import { TaskColumn } from './task-column/task-column.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',  // Имя файла базы данных
      entities: [Project, Task, User, TaskColumn], // Указываем все сущности
      synchronize: true,  // Автоматическое создание таблиц на основе сущностей
    }),
    ProjectModule,
    TaskModule,
    UserModule,
    TaskColumnModule,
  ],
})
export class AppModule {}
