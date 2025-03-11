import {Controller, Post, Body, Get, Delete, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    async login(@Body('id') id: number, @Body('password') password: string): Promise<string> {
        const isValid = await this.userService.validateUserPassword(id, password);
        if (!isValid) throw new Error('Invalid credentials');

        return 'Login successful';
    }

    @Post()
    @ApiOperation({ summary: 'Создать нового пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь создан успешно', type: User })
    async create(@Body() body: { name: string, password: string }): Promise<User> {
        return this.userService.createUser(body.name, body.password);
    }

    @Get()
    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, description: 'Список пользователей', type: [User] })
    async getAll(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') userId: number): Promise<void> {
        await this.userService.deleteUser(userId);
    }
}
