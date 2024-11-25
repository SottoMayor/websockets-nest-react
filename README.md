# Execução do projeto
1. Importar a collection da pasta root no insomnia.   
2. Inicializar o server: `/server` => `npm run start:dev`.
     - Opcional: criar pelo menos 1 user via insomnia neste passo.    
3. Inicializar o client: `/client` => `npm run dev`.   
     - Se tiver feito o opcional do passo anterior, os usuários já criados vão carregar na tela.   
4. Com server e client rodando, para novas inclusões de users o websocket gerencia o push de dados, possibilitando a UI atualizar a tela.   

# WebSockets

- **Definição**: WebSocket é um protocolo de comunicação sobre HTTP, permitindo comunicação bidirecional em tempo real entre cliente e servidor.
- **Envio em tempo real**: Push de dados.
- **handshake**: processo inicial onde o cliente solicita ao servidor para trocar o protocolo de HTTP para WebSocket. Após a troca, a comunicação se torna bidirecional e contínua.
- **Coexistência com protocolo HTTP**: Usado para comunicação persistente após o handshake. Nada impede um projeto de usar os protocolos HTTP e WebSocket em conjunto.
- **Soluções vastamente aceitas na comunidade**: A biblioteca Socket.IO entra como um facilitador para o uso de WebSockets.

## Socket.IO

1. **Servidor**: Configurado para aceitar conexões WebSocket.
2. **Cliente**: Conecta-se ao servidor usando Socket.IO.
3. **Comunicação**: O servidor envia dados em tempo real para o cliente.

### Servidor

1. **Configuração**: O servidor deve ser configurado para inicializar e ser usado em múltiplos arquivos.
2. **Conexão com o Cliente**: Deve existir um cliente para uma conexão ser gerada.
3. **Regras de Negócio**: No servidor é ficam as regras de negócio, a transmição da mensagem geralmente ocorre após processamento destas lógicas.
4. **Transmissão de Mensagens**: A transmissão é um evento, a partir dele uma comunicação entre o servidor e cliente é aberta (`channel`), portanto esta deve ser nomeada. Além do nome, cada evento deve ter os dados que serão enviados para o client, dentre esses dados deve haver um campo `action` em forma de string com um nome. 
     ```js
     io.emit('ok', { action: 'create-users', user: userData });
     ```
6. **Um canal e várias actions**: Em um mesmo canal, é possível passar dados variados, conectados a diferentes ações.

### Cliente

1. **Inicialização**: O cliente deve ser inicializado na URL do servidor.
2. **Ações sobre Eventos**: O cliente escuta os eventos no `channel` criado no servidor, escolhendo qual `action` utilizar para atualizar os dados do cliente no componente.
