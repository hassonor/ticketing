import mongoose from "mongoose";
import {app} from "./app";
import {consumer, producer} from "./kafka";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    if (!process.env.KAFKA_CLIENT_ID) {
        throw new Error('KAFKA_CLIENT_ID must be defined');
    }
    if (!process.env.KAFKA_BROKER) {
        throw new Error('KAFKA_BROKER must be defined');
    }
    if (!process.env.KAFKA_CONSUMER_GROUP_ID) {
        throw new Error('KAFKA_CONSUMER_GROUP_ID must be defined');
    }

    try {
        // Connect Kafka producer and consumer
        await producer.connect();
        await consumer.connect();

        // Start listening with the consumer
        await consumer.listen();
        console.log("Kafka Consumer listening for messages");

        // Gracefully handle shutdown
        process.on("SIGINT", async () => {
            console.log("SIGINT received, shutting down gracefully...");
            await shutdown();
        });
        process.on("SIGTERM", async () => {
            console.log("SIGTERM received, shutting down gracefully...");
            await shutdown();
        });
    } catch (err) {
        console.error(" Error connecting to Kafka:", err);
        process.exit(1);
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }

    // Start the app
    app.listen(4000, () => {
        console.log("Listening on port 4000");
    });
};

const shutdown = async () => {
    try {
        await producer.disconnect();
        await consumer.disconnect();

        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    } catch (err) {
        console.error("Error during shutdown:", err);
    } finally {
        console.log("👋 Shutdown complete. Exiting...");
        process.exit(0);
    }
};

start();
