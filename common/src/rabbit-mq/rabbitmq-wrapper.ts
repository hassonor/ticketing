import amqp, {Connection, Channel} from 'amqplib';

class RabbitMQWrapper {
    private _connection?: Connection;
    private _channel?: Channel;

    get connection() {
        if (!this._connection) {
            throw new Error('Cannot access RabbitMQ connection before connecting');
        }
        return this._connection;
    }

    get channel() {
        if (!this._channel) {
            throw new Error('Cannot access RabbitMQ channel before connecting');
        }
        return this._channel;
    }

    async connect(uri: string): Promise<void> {
        if (this._connection) return;

        try {
            this._connection = await amqp.connect(uri);
            this._channel = await this._connection.createChannel();
            console.log('Connected to RabbitMQ');
        } catch (err) {
            console.error('Failed to connect to RabbitMQ:', err);
        }
    }

    async sendMessage(queue: string, message: string): Promise<void> {
        if (!this._channel) {
            throw new Error('Cannot send message, no channel available');
        }
        await this._channel.assertQueue(queue, {
            durable: true,
        });
        this._channel.sendToQueue(queue, Buffer.from(message), {
            persistent: true,
        });
        console.log(`Message sent to queue ${queue}`);
    }

    async close(): Promise<void> {
        if (this._channel) {
            await this._channel.close();
        }
        if (this._connection) {
            await this._connection.close();
        }
    }
}

export const rabbitMQWrapper = new RabbitMQWrapper();