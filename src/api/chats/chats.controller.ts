import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/types/enum/authorization.enum';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // ======================= GET ALL CHAT HEADS =======================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Get all chat heads' })
  @Get('chat-heads')
  getAllChatHeads(@LoggedInUser() id: string) {
    return this.chatsService.getAllChatHeads(id);
  }

  // ======================= GET ALL CHAT HEADS =======================
  @ApiBody({ type: CreateChatDto })
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Create Chat' })
  @Post()
  create(@LoggedInUser() id: string, @Body() body: CreateChatDto) {
    return this.chatsService.createChat(id, body.participantId);
  }
}
