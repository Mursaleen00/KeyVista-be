import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from 'src/schemas/property.schema';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    @InjectModel(Property.name)
    private readonly PropertyModel: Model<PropertyDocument>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET as string);
  }

  async createCheckoutSession(
    amount: number,
    productId: string,
  ): Promise<{ url: string }> {
    const property = await this.PropertyModel.findById(productId);
    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: property?.name ?? '',
                description: property?.description ?? '',
                images: [property?.thumbnail ?? ''],
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `https://example.com/success`,
        cancel_url: `https://example.com/cance`,
        metadata: {
          productId: productId,
        },
      });

      return { url: session.url ?? '' };
    } catch (error) {
      console.error('Error creating session:', error);
      throw new InternalServerErrorException(
        'Failed to create checkout session',
      );
    }
  }
}
