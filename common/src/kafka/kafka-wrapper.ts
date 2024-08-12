// common/src/kafka-wrapper.ts
import {Kafka, Producer, Consumer} from 'kafkajs';

class KafkaWrapper {
    private _client?: Kafka;
    private _producer?: Producer;
    private _consumer?: Consumer;

    connect(brokers: string[], clientId: string) {
        this._client = new Kafka({clientId, brokers});
        this._producer = this._client.producer();
        this._consumer = this._client.consumer({groupId: clientId});
    }

    get producer() {
        if (!this._producer) {
            throw new Error('Producer is not initialized');
        }
        return this._producer;
    }

    get consumer() {
        if (!this._consumer) {
            throw new Error('Consumer is not initialized');
        }
        return this._consumer;
    }
}

export const kafkaWrapper = new KafkaWrapper();
