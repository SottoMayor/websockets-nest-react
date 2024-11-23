import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Substitua pelo endereço do seu frontend
    methods: ['GET', 'POST'],
    credentials: true,
  } 
})
export class UsersGateway {
   @WebSocketServer() server: Server;

  handleConnection(client: any) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  notifyNewUser(user: { name: string, id: number }) {
    console.log('Payload enviado: ', user)
    this.server.emit('newUser', { action: 'notify_new_user', ...user }); 
  }
}
