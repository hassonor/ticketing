import mongoose from "mongoose";
import {app} from "./app";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
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


