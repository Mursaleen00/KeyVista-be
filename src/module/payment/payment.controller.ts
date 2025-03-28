import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Stripe } from 'stripe';
import { CreateCheckOutSessionDto } from './dto/create-check-out-session.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBody({
    type: CreateCheckOutSessionDto,
  })
  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: CreateCheckOutSessionDto,
  ): Promise<Stripe.Checkout.Session> {
    const { amount, productId } = body;
    return this.paymentService.createCheckoutSession(amount, productId);
  }
}
