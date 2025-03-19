import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoggedInUser } from 'src/decorators/loggedInuser.decorator';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { AuthorizationHeader } from 'src/types/enum/common.type';
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // ================ GET RATINGS BY PROPERTY ID ==================
  @Get('ratings/:id')
  @ApiOperation({ summary: 'Get ratings by property id' })
  getRatings(@Param('id') id: string) {
    return this.reviewsService.getRatings(id);
  }

  // ================ GET REVIEWS BY PROPERTY ID ==================
  @Get(':id')
  @ApiOperation({ summary: 'Get Reviews by property id' })
  getReviews(@Param('id') id: string) {
    return this.reviewsService.getReviews(id);
  }

  // ================ CREATE RATING AND REVIEW BY PROPERTY ID ==================
  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Create rating and review by property id' })
  @Post()
  create(@LoggedInUser() userId: string, @Body() body: CreateReviewsDto) {
    return this.reviewsService.create({ ...body, userId });
  }
}
