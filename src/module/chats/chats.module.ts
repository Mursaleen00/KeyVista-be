import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/register.schema';
import {
  Notification,
  NotificationSchema,
} from '../../schemas/notification.schema';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { Chats, ChatsSchema } from '../../schemas/chats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chats.name, schema: ChatsSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService, JwtService],
})
export class ChatsModule {}
