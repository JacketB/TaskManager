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
import { CommentModule } from './comment/comment.module';
import {Comment} from "./comment/comment.entity";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',  // Имя файла базы данных
      entities: [Project, Task, User, TaskColumn, Comment], // Указываем все сущности
      synchronize: true,  // Автоматическое создание таблиц на основе сущностей
    }),
    ProjectModule,
    TaskModule,
    UserModule,
    TaskColumnModule,
    CommentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),  // Путь к папке с загруженными файлами
    }),
  ],
})
export class AppModule {}
