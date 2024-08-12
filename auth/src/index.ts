import mongoose from "mongoose";
import {app} from "./app";
// import {kafkaWrapper} from "@ohticketing/common";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    // try {
    //     await kafkaWrapper.connect(['my-cluster-kafka-bootstrap:9092'], 'auth-service');
    //     await kafkaWrapper.producer.connect();
    //     console.log('Connected to Kafka');
    // } catch (err) {
    //     console.error(err);
    // }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
    app.listen(4000, () => {
        console.log('Listening on port 4000');
    });
}

start();


