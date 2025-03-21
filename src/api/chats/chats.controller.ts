import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/types/enum/common.type';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('chats')
@ApiBearerAuth()
@Controller('api/chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @ApiBody({ type: CreateChatDto })
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Start Chat' })
  @Post('start')
  async startChat(
    @Body() participantId: CreateChatDto['participantId'],
    @LoggedInUser() userId: string,
  ) {
    return this.chatsService.startChat(userId, participantId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Get User Chats' })
  @Get()
  async getUserChats(@LoggedInUser() userId: string) {
    return this.chatsService.getUserChats(userId);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Get Chat Messages' })
  @Get(':chatId/messages')
  async getChatMessages(@Param('chatId') chatId: string) {
    return this.chatsService.getChatMessages(chatId);
  }
}
