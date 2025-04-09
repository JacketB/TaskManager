import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {TaskModule} from "../task/task.module";
import {UserModule} from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), TaskModule, UserModule],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}
