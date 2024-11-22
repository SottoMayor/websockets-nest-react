import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway()
export class UsersGateway {
   @WebSocketServer() server: Server;

  notifyNewUser(user: { name: string, id: number }) {
    this.server.emit('newUser', { action: 'notify_new_user', ...user }); 
  }
}
