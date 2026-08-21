import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/auth.dto';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}


    @MessagePattern('users.findAll')
    findAll(@Payload() data: any) {
        return this.userService.findAll()
    }


    @MessagePattern('user.findUsername')
    findByUsername(@Payload() username: string) {
        return this.userService.findByUsername(username)
    }

    @MessagePattern('user.findUserEmail')
    findByUserEmail(@Payload() email: string){
        return this.userService.findByEmail(email)
    }

    @MessagePattern('user.create')
    create(@Payload() data: CreateUserDto) {
        return this.userService.create(data)
    }
}
