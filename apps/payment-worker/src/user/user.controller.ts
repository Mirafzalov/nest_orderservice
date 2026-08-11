import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}


    @MessagePattern('users.findAll')
    findAll(@Payload() data: any) {
        return this.userService.findAll()
    }

}
