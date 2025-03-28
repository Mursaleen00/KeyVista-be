import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/enum/authorization.enum';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // =================== GET ALL NOTIFICATIONS ===================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Get all notifications' })
  @Get()
  findAll(@LoggedInUser() userId: string) {
    return this.notificationService.findAll(userId);
  }

  // =================== READ ALL NOTIFICATIONS ===================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Read all notifications' })
  @Get('read')
  read(@LoggedInUser() userId: string) {
    return this.notificationService.read(userId);
  }

  // =================== READ ALL NOTIFICATIONS ===================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Notify user about notifications' })
  @Get('notify')
  notify(@LoggedInUser() userId: string) {
    return this.notificationService.notify(userId);
  }
}
