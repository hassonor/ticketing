import { Consumer, EachBatchPayload } from 'kafkajs';
import { Subscriber } from './base-subscriber';

const greenColor = '\x1b[32m';

export class BaseConsumer {
  private subscribers: InstanceType<typeof Subscriber>[];
  protected consumer: Consumer;

  constructor(
    _consumer: Consumer,
    _subscribers: InstanceType<typeof Subscriber>[]
  ) {
    this.consumer = _consumer;
    this.subscribers = _subscribers;
  }

  async connect() {
    await this.consumer.connect();
    console.log('Consumer connected');
  }

  async disconnect() {
    await this.consumer.disconnect();
    console.log('Consumer disconnected');
  }

  onDisconnect(callback: () => void) {
    this.consumer.on('consumer.disconnect', callback);
  }

  async listen() {
    await this.subscribe();
    await this.run();
  }

  private async subscribe() {
    await this.consumer.subscribe({
      topics: this.subscribers.map((subscriber) => subscriber.topic),
      fromBeginning: true,
    });
  }

  private async run() {
    await this.consumer.run({
      eachBatchAutoResolve: false,
      eachBatch: this.handleBatch,
    });
  }

  private handleBatch = async (eachBatchPayload: EachBatchPayload) => {
    const { batch, resolveOffset, heartbeat } = eachBatchPayload;

    for (const message of batch.messages) {
      if (!message.value) {
        throw new Error('Message value is null');
      }

      console.log(greenColor + 'Message received / ' + batch.topic);

      const parsedData = this.parseMessage(message.value);

      const subscriber = this.subscribers.find(
        (subscriber) => subscriber.topic === batch.topic
      );
      if (!subscriber) {
        throw new Error('There is no subscriber for this topic.');
      }

      await subscriber.onMessage(parsedData);
      console.log(greenColor + 'Message processed');

      resolveOffset(message.offset);
      await heartbeat();
    }
  };

  parseMessage(data: any) {
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
