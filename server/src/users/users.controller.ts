import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService,
        private usersGateway: UsersGateway
    ) {}

    @Get()
    listUsers() {
        const users = this.userService.listUsers();
        return users;
    }

    @Post()
    addUser(@Body() userData: { name: string }) {
        const user = this.userService.addUser(userData);

        this.usersGateway.notifyNewUser(user.user)
        
        return user;
    }
}
