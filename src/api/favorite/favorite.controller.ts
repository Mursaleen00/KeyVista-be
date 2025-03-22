import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/types/enum/common.type';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Get all favorite' })
  @Get()
  findAll(@LoggedInUser() userId: string) {
    return this.favoriteService.findAll({ userId });
  }

  @ApiBody({ schema: { example: { propertyId: '67d953c1b76441fea9492f49' } } })
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Add to favorite' })
  @Patch()
  addToFavorite(
    @LoggedInUser() userId: string,
    @Body() propertyId: { propertyId: string },
  ) {
    return this.favoriteService.addToFavorite({
      userId,
      propertyId: propertyId.propertyId,
    });
  }
}
