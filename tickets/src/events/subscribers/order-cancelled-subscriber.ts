import {TicketUpdatedPublisher} from "../publishers/ticket-updated-publisher";
import {producer} from "../../kafka";
import {OrderCancelledEvent, Subscriber, Topics} from "@ohticketing/common";
import {Ticket} from "../../models/tickets";

class OrderCancelledSubscriber extends Subscriber<OrderCancelledEvent> {
    readonly topic = Topics.OrderCancelled;

    async onMessage(data: OrderCancelledEvent['data']): Promise<void> {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        ticket.set({orderId: undefined});
        await ticket.save();
        
        await new TicketUpdatedPublisher(producer).publish({
            id: ticket.id,
            version: ticket.version,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            orderId: ticket.orderId,
        });
    }
}

export const orderCancelledSubscriber = new OrderCancelledSubscriber();