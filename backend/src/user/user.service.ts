import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUserPassword(name: string, password: string): Promise<object | null> {
    const user = await this.userRepository.findOne({
      where: { name: name },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return null;
    }

    return {
      id:user.id,
      name: user.name,
      role: user.role
    };
  }

  async createUser(
    username: string,
    password: string,
    role: string,
  ): Promise<Promise<User> | null> {
    const checkuser = await this.userRepository.findOne({
      where: { name: username },
    });

    if (checkuser) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = username;
    user.password = hashedPassword;
    user.role = role;

    return this.userRepository.save(user);
  }

  async updateUser(id: number, username: string, password: string | null, role: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      return null;
    }
    user.name = username;
    user.role = role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found'); // Или вы можете использовать Exception фильтры NestJS
    }

    await this.userRepository.remove(user); // Удаляем пользователя
  }
}
