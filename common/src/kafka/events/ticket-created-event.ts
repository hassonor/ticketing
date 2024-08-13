import { Topics } from './topics';

export interface TicketCreatedEvent {
  topic: Topics.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
