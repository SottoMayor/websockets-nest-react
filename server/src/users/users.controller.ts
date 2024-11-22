import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    listUsers() {
        const users = this.userService.listUsers();
        return users;
    }

    @Post()
    addUser(@Body() userData: { name: string }) {
        const user = this.userService.addUser(userData);
        return user;
    }
}
