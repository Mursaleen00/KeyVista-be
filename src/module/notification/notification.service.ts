import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from '../../schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationsModel: Model<NotificationDocument>,
  ) {}

  // =================== GET ALL NOTIFICATIONS ===================
  async findAll(userId: string) {
    try {
      const notifications = await this.notificationsModel.find({ userId });
      return { notifications };
    } catch (error) {
      console.log('🚀 ~ NotificationService ~ findAll ~ error:', error);
    }
  }

  // =================== READ ALL NOTIFICATIONS ===================
  async read(userId: string) {
    try {
      await this.notificationsModel.updateMany(
        { userId },
        { $set: { isRead: true } },
      );
      return { message: 'Notification read successfully' };
    } catch (error) {
      console.log('🚀 ~ NotificationService ~ read ~ error:', error);
    }
  }

  // =================== NOTIFY USER ABOUT NOTIFICATIONS ===================
  async notify(userId: string) {
    try {
      let notify = false;
      const notifications = await this.notificationsModel.find({ userId });

      notifications.map((notification) => {
        if (!notification.isRead) notify = true;
      });

      return { notify };
    } catch (error) {
      console.log('🚀 ~ NotificationService ~ notify ~ error:', error);
    }
  }
}
