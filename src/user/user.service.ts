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

    async validateUserPassword(id: number, password: string): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: { id: id },
        });

        if (!user) {
            return false;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid;
    }

    async createUser(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user.name = username;
        user.password = hashedPassword;

        return this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async deleteUser(userId: number): Promise<void> {
        const user = await this.userRepository.findOne({where: {id: userId}});

        if (!user) {
            throw new Error('User not found'); // Или вы можете использовать Exception фильтры NestJS
        }

        await this.userRepository.remove(user); // Удаляем пользователя
    }
}
