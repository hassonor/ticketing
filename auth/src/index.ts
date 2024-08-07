import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signin";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
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


