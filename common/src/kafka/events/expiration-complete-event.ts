import {Topics} from '../topics';

export interface ExpirationCompleteEvent {
    topic: Topics.ExpirationComplete;
    data: {
        orderId: string;
    };
}
