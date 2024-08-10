import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import {app} from "../app";
import request from "supertest";


declare global {
    var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'somePasswordForTestTheTest';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
})


afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});


global.signin = () => {
    // Build a JWT payload. {id, email}
    const payload = {
        id: '12312adflkhj',
        email: 'test@test.com'
    }

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build Session Object. {jwt:MY_JWT}
    const session = {jwt: token};

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string that's the cookie with the encoded data
    return [`session=${base64}`];
}