import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from "cookie-session";
import {errorHandler, NotFoundError} from "@ohticketing/common";

import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signin";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
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

export {app};