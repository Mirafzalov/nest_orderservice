import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    
    @Get('users')
    findAll() {
        return this.authService.findAll()
    }

    @Post('register')
    register(@Body() data: CreateUserDto) {
        return this.authService.register(data)
    }

    @Post('login')
    login(@Body() data: LoginUserDto) {
        return this.authService.login(data)
    }

    
}
