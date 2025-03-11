import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: "login" },
        password: { type: 'string', example: '123456' },
      },
    },
  })
  async login(
    @Body('name') name: string,
    @Body('password') password: string,
  ): Promise<object|null> {
    const isValid = await this.userService.validateUserPassword(name, password);

    return isValid;
  }

  @Post()
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь создан успешно',
    type: User,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        password: { type: 'string', example: 'securePass123' },
        role: { type: 'string', example: 'admin' },
      },
    },
  })
  async create(
    @Body() body: { name: string; password: string; role: string },
  ): Promise<Promise<User>| null> {
    return this.userService.createUser(body.name, body.password, body.role);
  }

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей',
    type: [User],
  })
  async getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: 'ID пользователя',
  })
  async deleteUser(@Param('id') userId: number): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
