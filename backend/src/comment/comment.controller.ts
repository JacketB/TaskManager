import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CreateCommentDto} from "../dto/create-comment.dto";


@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    async create(@Body() dto: CreateCommentDto) {
        return this.commentService.createComment(dto.taskId, dto.userId, dto.content);
    }

    @Get('task/:taskId')
    async getByTaskId(@Param('taskId') taskId: number) {
        return this.commentService.getCommentsByTaskId(taskId);
    }
}
