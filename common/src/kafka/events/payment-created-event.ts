import { Topics } from './topics';

export interface PaymentCreatedEvent {
  topic: Topics.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
