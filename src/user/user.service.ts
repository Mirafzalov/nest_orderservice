import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findByUsername(username) {
        return await this.userRepository.findOne({ where: { username } })
        
    }


    async findByEmail(email) {
        const userEmail = await this.userRepository.find()
        return userEmail.filter((user) => user.email === email)
    }

    async create(data) {
        await this.userRepository.save(data)
    }

    async find() {
        return await this.userRepository.find()
    }


}
