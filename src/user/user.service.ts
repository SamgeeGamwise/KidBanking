import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt from "bcrypt";
import { Repository, UpdateResult } from 'typeorm'
import { User } from '../database/user.entity'
import { AccountService } from '../account/account.service'

const saltRounds = 10;

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY') 
        private readonly userRepository: Repository<User>
    ) {}
    
    async getUser(userId: string): Promise<User> {
        return this.userRepository.findOneOrFail({ where: { id: userId }, relations: ['accounts', 'accounts.transactions'] })
    }
    
    async login(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email }, relations: ['accounts', 'accounts.transactions'] });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        return user;
    }
    
    async createUser(firstName: string, lastName: string, email: string, password: string): Promise<User> {
        return this.userRepository.create({ firstName, lastName, email, password })
    }
    
    async updateUserPassword(id: string, oldPassword: string, password: string): Promise<UpdateResult> {
        const user = await this.userRepository.findOne({ where: { id } });
        
        if (!user || !await bcrypt.compare(oldPassword, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        return this.userRepository.update(user, { password });
    }
    
    async updateUserEmail(id: string, email: string): Promise<UpdateResult> {
        return this.userRepository.update(id, { email });
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }});
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        return this.userRepository.remove(user);
    }
}
