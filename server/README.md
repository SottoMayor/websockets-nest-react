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

## Observações

- Neste app, não existe outro módulo além do users, poranto o gateway foi definido dentro deste módulo.
- Uma abordagem interessante: Faça a DI do gateway no controller. 
	- 1) Regra de negócio com o service.
   	- 2) Dispare o gateway para o push de dados.
   	- 3) Retorne os dados do service no controller.
- Existem outras abordagens, como injetar o gateway no service. Mas, ao usar a _abordagem interessante_ fica claro que o push ocorre após as lógicas de negócio serem processadas.

# CORS
As alternativas para habilitar o CORS usando websockets são um objeto ou boleano, sua configuração é definida dentro do decorator `@WebSocketGateway({cors: {...props}})`.   

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
     
# WebSocket Gateway no NestJS
- Semelhante a um Controller para o WebSocket, mas com foco na comunicação em tempo real.   
- O Gateway é responsável por gerenciar as conexões WebSocket e lidar com os eventos de comunicação bidirecional em tempo real.   

## Considerações sobre o WebSocket Gateway
1) Dependendo da aplicação, não há necessidade de mais de um gateway. Um é suficiente pra abrir múltiplos `channels` e `actions`.   
2) Pode ser interessante criar um módulo separado para o gateway, especialmente se o WebSocket for usado em outros módulos.   
3) Pode ser interessante criar um serviço dentro desse módulo de gateway, caso haja necessidade de processar alguma regra de negócio antes de enviar os dados.
4) Situações para se ter mais de um arquivo de gateway:
	- Quando há domínios de negócios completamente distintos que precisam de isolamento.
	- Diferentes protocolos ou configurações específicas.

