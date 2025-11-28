import { 
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
 } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


@WebSocketGateway({
    cors: {
        origin: '*'
    },
})

export class SocketService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server

    afterInit(server: Socket) {
        console.log('Socket Server Initialized')
    }

    handleConnection(client: any, ...args: any[]) {
        console.log(`Client Connected: ${client.id}`)
    }

    handleDisconnect(client: any) {
        console.log(`Client Disconnected: ${client.id}`)
    }

    @SubscribeMessage('create-user')
    handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): void{
        console.log(`Message received from ${client.id}:`, data);

        this.server.emit('newMessage',data)
    }


    notifyUser(@MessageBody() data: string){
        this.server.emit('notification',data);
    }

}