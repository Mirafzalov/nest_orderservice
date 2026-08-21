import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }


    async findAll() {
        const users = await this.userRepository.find()

        const result: any[] = [] // {id, username, email}

        for (let user of users) {
            let { password, ...res } = user
            result.push(res)
            console.log(res)
        }
        return result

    }


    async findByUsername(username) {
        return await this.userRepository.findOne({ where: { username } })

    }

    async findByEmail(email) {
        const userEmail = await this.userRepository.find()
        return userEmail.filter((user) => user.email === email)
    }

    async create(data) {
        const user = this.userRepository.create(data) 
        return await this.userRepository.save(user)
    }


}
