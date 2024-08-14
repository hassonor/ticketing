import {Topics} from '../topics';

export interface TicketUpdatedEvent {
    topic: Topics.TicketUpdated;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
        version: number;
        orderId?: string; // it can happen that we update a ticket so that we don't reserve it (e.g. update the price)
    };
}
