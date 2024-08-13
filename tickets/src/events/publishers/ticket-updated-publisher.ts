import {Publisher, TicketUpdatedEvent, Topics} from "@ohticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly topic = Topics.TicketUpdated;
}