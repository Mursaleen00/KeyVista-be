import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthorizationHeader } from 'src/enum/authorization.enum';
import { AuthenticationGuard } from 'src/guards/jwt-authentication.guard';
import { Stripe } from 'stripe';
import { CreateCheckOutSessionDto } from './dto/create-check-out-session.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiOperation({ summary: 'Create checkout session' })
  @UseGuards(AuthenticationGuard)
  @ApiBody({
    type: CreateCheckOutSessionDto,
  })
  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: CreateCheckOutSessionDto,
  ): Promise<{ url: string }> {
    const { amount, productId } = body;
    return this.paymentService.createCheckoutSession(amount, productId);
  }
}
