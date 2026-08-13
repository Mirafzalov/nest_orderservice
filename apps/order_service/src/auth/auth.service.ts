import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserDto, LoginUserDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { first, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('RABBIT_AUTH')
        private readonly rabbit: ClientProxy,
        private readonly jwtService: JwtService
    ) { }

    async register(data: CreateUserDto) {

        const { username, email, password } = data

        const user = await firstValueFrom(this.rabbit.send('user.findUsername', username))

        const isEmail = await firstValueFrom(this.rabbit.send('user.findUserEmail', email))

        if (user) {
            throw new BadRequestException('Username already exists')
        }

        if (isEmail.length > 0) {
            throw new BadRequestException('Email already exists')
        }

        const hashedPassword = await argon2.hash(password)

        return await firstValueFrom(this.rabbit.send('user.create', { username: username, email: email, password: hashedPassword }))

    }


    async login(data: LoginUserDto) {

        const { username, password } = data

        const user = await firstValueFrom(this.rabbit.send('user.findUsername', username))


        if (!user) {
            throw new UnauthorizedException('Invalid username or password')
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid username or password')
        }

        const payload = { sub: user.id, username: user.username }
        const accessToken = await this.jwtService.signAsync(payload)

        return { accessToken }


    }

    async findAllUsers() {
        return await firstValueFrom(this.rabbit.send('users.findAll', {}))
    }
}
