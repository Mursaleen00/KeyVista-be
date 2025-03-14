import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/types/enum/common.type';
import { UserResponse } from 'src/types/types/user-response';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ============================ GET ME ============================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Get Profile' })
  @Get('me')
  getMe(@LoggedInUser() id: string): Promise<UserResponse> {
    return this.userService.getMe(id);
  }

  // ============================ UPDATE PROFILE =====================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Update Profile' })
  @Patch('update')
  UpdateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @LoggedInUser() id: string,
  ): Promise<{ message: string; user: UserResponse }> {
    return this.userService.update(id, updateUserDto);
  }
}
