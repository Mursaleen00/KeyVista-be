import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/entity/register.entity';
import {
  Notification,
  NotificationSchema,
} from '../notification/entities/notification.entities';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { Chats, ChatsSchema } from './entities/chats.entities';

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
