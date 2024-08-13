import {Publisher, TicketCreatedEvent, Topics} from "@ohticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly topic = Topics.TicketCreated;
}