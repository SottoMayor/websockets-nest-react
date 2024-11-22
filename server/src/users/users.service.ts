import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];

    listUsers () {
        return { users: this.users };
    }

    addUser(userData: { name: string }) {
        const user = { id: Date.now(), name: userData.name };
        this.users.push(user);
        return { user };
    }

}
