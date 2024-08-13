import { Topics } from './topics';

export interface OrderCancelledEvent {
  topic: Topics.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
