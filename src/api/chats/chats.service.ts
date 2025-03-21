import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  // Start a new chat between two users
  async startChat(userId: string, participantId: string): Promise<Chat> {
    const existingChat = await this.chatModel.findOne({
      participants: { $all: [userId, participantId] },
    });

    if (existingChat) {
      return existingChat;
    }

    const chat = new this.chatModel({
      participants: [userId, participantId],
      createdBy: userId,
    });
    return chat.save();
  }

  // Send a message in a chat
  async sendMessage(
    chatId: string,
    senderId: string,
    content: string,
  ): Promise<Message> {
    const message = new this.messageModel({
      chat: chatId,
      sender: senderId,
      content,
    });
    return message.save();
  }

  // Get all chats for a user
  async getUserChats(userId: string): Promise<Chat[]> {
    return this.chatModel
      .find({ participants: userId })
      .populate('participants', 'name email')
      .exec();
  }

  // Get chat history (messages in a chat)
  async getChatMessages(chatId: string): Promise<Message[]> {
    return this.messageModel
      .find({ chat: chatId })
      .populate('sender', 'name')
      .sort({ createdAt: 1 })
      .exec();
  }

  // Add a method to fetch a chat by ID
  async getChatById(chatId: string): Promise<Chat | null> {
    return this.chatModel.findById(chatId).exec();
  }
}
