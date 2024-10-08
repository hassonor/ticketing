import express, {Request, Response} from "express";
import {requireAuth, validateRequest} from "@ohticketing/common";
import {body} from "express-validator";
import {Ticket} from "../models/tickets";
import {TicketCreatedPublisher} from "../events/publishers/ticket-created-publisher";
import {producer} from "../kafka";


const router = express.Router();


router.post('/api/tickets', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({gt: 0}).withMessage('Price must be greater than zero')
], validateRequest, async (req: Request, res: Response) => {
    const {title, price} = req.body;
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    })

    await ticket.save();


    await new TicketCreatedPublisher(producer).publish({
        id: ticket.id,
        userId: ticket.userId,
        title: ticket.title,
        price: ticket.price,
        version: ticket.version,
    });

    res.status(201).send(ticket);
})

export {router as createTicketRouter};