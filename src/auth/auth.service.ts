import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { CreateUserDto, LoginUserDto } from 'src/dto/auth.dto';
import { verify } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) { }

    async register(data: CreateUserDto) {

        const { username, email, password } = data

        const user = await this.userService.findByUsername(username)

        const isEmail = await this.userService.findByEmail(email)


        if (user) {
            throw new BadRequestException('Username already exists')
        }

        if (isEmail.length > 0) {
            throw new BadRequestException('Email already exists')
        }

        const hashedPassword = await argon2.hash(password)

        return await this.userService.create({ username: username, email: email, password: hashedPassword })

    }


    async login(data: LoginUserDto) {

        const { username, password } = data

        const user = await this.userService.findByUsername(username)


        if (!user) {
            throw new UnauthorizedException('Invalid username or password')
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid username or password')
        }

        return user



    }

    async findAll() {
        return await this.userService.find()
    }
}
