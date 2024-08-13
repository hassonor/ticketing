import { Producer } from 'kafkajs';
import { Topics } from './topics';

interface Event {
  topic: Topics;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract topic: T['topic'];
  protected producer: Producer;

  constructor(_producer: Producer) {
    this.producer = _producer;
  }

  async publish(data: T['data']) {
    try {
      await this.producer.send({
        topic: this.topic,
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.error(error);
    }
  }
}
