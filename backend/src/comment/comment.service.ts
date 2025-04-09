import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createComment(taskId: number, userId: number, content: string, filePath?: string | null): Promise<Comment> {
        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!task) {
            throw new Error(`Задача с ID ${taskId} не найдена`);
        }
        if (!user) {
            throw new Error(`Пользователь ID ${userId} не найден`);
        }

        const comment = new Comment();
        comment.content = content;
        comment.task = task;
        comment.author = user;
        if (filePath) {
            comment.filePath = filePath;
        }

        return this.commentRepository.save(comment);
    }

    async getCommentsByTaskId(taskId: number): Promise<Comment[]> {
        return this.commentRepository.find({ where: { task: { id: taskId } }, relations: ['author'] });
    }
}
