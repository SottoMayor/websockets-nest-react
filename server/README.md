# Passo a passo no Server


1) Geração e injeção de arquivos:
	- `nest g module users`
	- `nest g controller users --no-spec`
	- `nest g service users --no-spec`
	- `nest g gateway users --no-spec`

2) Instalação dos pacotes de websocket com socket.io:
	- docs: https://docs.nestjs.com/websockets/gateways
	- `npm i --save @nestjs/websockets @nestjs/platform-socket.io`

3) Criação de endpoints com controller e service.

4) Configuração do gateway de websocket (`users.gateway`).
    -  Criação de método para adicionar user.   
    -  Métodos de log para verificar conexão com o client.   
    -  Habilitação do CORS do websocket (Veja a seção CORS deste README).
      
5) Conexão do gateway no controller.

6) Habilitação do CORS http no main.ts

# CORS
Algumas alternativas para habilitar o CORS usando websockets. É um objeto ou boleano que seta a sua configuração dentro do decorator `@WebSocketGateway({cors: {...props}})`.   

1) **Apenas para desenvolvimento**: 
  - A opção `@WebSocketGateway({cors: true})` funciona, mas pode não ser o ideal em questões de segurança.
  - Qualquer um pode se conectar com o server.
2) **Recomendada**:
    - Configuração de um objeto com origin e methods, passando a origin como uma variável de ambiente:
      ```
      @WebSocketGateway({ cors: { origin: process.env.FRONTEND_URL, methods: ['GET', 'POST'], credentials: true } })
      ```   
    - Passos:    
      - `npm install @nestjs/config`.
      - Criação do .env e definição da env. var. `FRONTEND_URL`.   
      - Carregando das env. vars. por meio do dotenv.   
