import { Topics } from './topics';

interface Event {
  topic: Topics;
  data: any;
}
export abstract class Subscriber<T extends Event> {
  abstract topic: T['topic'];
  abstract onMessage(data: T['data']): Promise<void>;
}
