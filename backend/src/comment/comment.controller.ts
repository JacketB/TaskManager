import {Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CreateCommentDto} from "../dto/create-comment.dto";
import {diskStorage} from "multer";
import {FileInterceptor} from "@nestjs/platform-express";
import {extname, join} from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';


@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads', // путь к папке
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateCommentDto,
    ) {
        const filePath = file ? file.filename : null;
        return this.commentService.createComment(dto.taskId, dto.userId, dto.content, filePath);
    }

    @Get('task/:taskId')
    async getByTaskId(@Param('taskId') taskId: number) {
        return this.commentService.getCommentsByTaskId(taskId);
    }

    @Get('download/:filename')
    async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = join(__dirname, '..', '..', 'uploads', filename);
        const file = createReadStream(filePath);

        res.set({
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Type': 'application/octet-stream',
        });

        file.pipe(res);
    }
}
