import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { ChatsService } from './chats.service';

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatsService: ChatsService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @UseGuards(AuthenticationGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    payload: { chatId: string; content: string },
  ) {
    const userId = client.handshake.query.userId as string;
    const { chatId, content } = payload;

    // Save the message to MongoDB
    const message = await this.chatsService.sendMessage(
      chatId,
      userId,
      content,
    );

    // Fetch the chat using the public method
    const chat = await this.chatsService.getChatById(chatId);
    if (!chat) {
      throw new Error('Chat not found');
    }

    // Broadcast the message to all participants in the chat
    chat.participants.forEach((participantId) => {
      this.server.to(participantId.toString()).emit('receiveMessage', {
        chatId,
        senderId: userId,
        content,
        // createdAt: message.createdAt,
        createdAt: '2023-08-22T12:34:56.789Z',
      });
    });

    return message;
  }

  @UseGuards(AuthenticationGuard)
  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, chatId: string) {
    const userId = client.handshake.query.userId as string;
    client.join(chatId);
    this.server.to(userId).emit('joinedChat', chatId);
  }
}
