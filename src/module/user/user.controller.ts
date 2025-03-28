import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/enum/authorization.enum';
import { UserResponse } from 'src/types/user-response';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthenticationGuard)
@ApiBearerAuth(AuthorizationHeader.BEARER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ============================ GET ME ============================
  @ApiOperation({ summary: 'Get Profile' })
  @Get('me')
  getMe(@LoggedInUser() id: string): Promise<UserResponse> {
    return this.userService.getMe(id);
  }

  // ============================ UPDATE PROFILE =====================
  @ApiOperation({ summary: 'Update Profile' })
  @Patch('update')
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @LoggedInUser() id: string,
  ): Promise<{ message: string; user: UserResponse }> {
    return this.userService.update(id, updateUserDto);
  }

  // ============================ CHANGE PASSWORD =====================
  @ApiOperation({ summary: 'Change Password' })
  @Patch('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @LoggedInUser() id: string,
  ): Promise<{ message: string; user: UserResponse }> {
    return this.userService.changePassword(id, changePasswordDto);
  }
}
