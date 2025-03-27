import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/register.schema';
import { Chats, ChatsDocument } from '../../schemas/chats.schema';
import {
  Notification,
  NotificationDocument,
} from '../../schemas/notification.schema';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chats.name) private readonly ChatsModel: Model<ChatsDocument>,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectModel(Notification.name)
    private readonly NotificationModel: Model<NotificationDocument>,
  ) {}
  async getAllChatHeads(userId: string) {
    const chats = await this.ChatsModel.findOne({ userId });
    if (!chats) return { chatHeads: [] };
    return { chatHeads: chats?.chatHeads };
  }
  // ========================= Create Chat ========================
  async createChat(userId: string, participantId: string) {
    const participant = await this.UserModel.findById(participantId);
    const me = await this.UserModel.findById(userId);
    if (!participant) throw new NotFoundException('Participant not found');
    const isUserChats = await this.ChatsModel.findOne({ userId });
    const isParticipantChat = await this.ChatsModel.findOne({
      userId: participantId,
    });
    if (!isParticipantChat) {
      await this.ChatsModel.create({
        userId: participantId,
        chatHeads: [
          {
            participantId: userId,
            name: me?.fullName,
            profilePicture: me?.profilePicture,
            lastMessage: '',
            lastMessageTime: new Date(),
          },
        ],
      });
    }
    if (!isUserChats) {
      await this.ChatsModel.create({
        userId,
        chatHeads: [
          {
            participantId,
            name: participant.fullName,
            profilePicture: participant.profilePicture,
            lastMessage: '',
            lastMessageTime: new Date(),
          },
        ],
      });
    }
    const findHead1 = isUserChats?.chatHeads.find(
      (head) => head.participantId === participantId,
    );
    const findHead2 = isParticipantChat?.chatHeads.find(
      (head) => head.participantId === userId,
    );
    if (findHead1 || findHead2)
      throw new ConflictException('Chat already exists');
    isUserChats?.chatHeads.push({
      participantId: participantId,
      name: participant.fullName,
      profilePicture: participant.profilePicture,
      lastMessage: '',
      lastMessageTime: new Date(),
    });
    isParticipantChat?.chatHeads.push({
      participantId: userId,
      name: me?.fullName || '',
      profilePicture: me?.profilePicture || '/',
      lastMessage: '',
      lastMessageTime: new Date(),
    });
    await isUserChats?.save();
    await isParticipantChat?.save();
    await this.NotificationModel.create({
      userId: participantId,
      message: `Send you a message`,
      sender: {
        id: userId,
        name: me?.fullName,
        profilePicture: me?.profilePicture,
      },
      isRead: false,
    });
    return { message: 'Chat created successfully' };
  }
}
