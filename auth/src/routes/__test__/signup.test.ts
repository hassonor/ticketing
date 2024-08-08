import request from 'supertest';
import {app} from '../../app';
import cookieSession from "cookie-session";


it('returns a 201 on successful signup', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'hassonor@gmail.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalid-email',
            password: 'password'
        })
        .expect(400);
});


it('returns a 400 with an invalid  password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({email: 'test@test.com', password: '2'})
        .expect(400);
});

it('returns a 400 with invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({email: '23232', password: 'password'})
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'hassonor@gmail.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'hassonor@gmail.com',
            password: 'password'
        })
        .expect(400);
});


it('sets a cookie after a successful signup', async () => {

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'hassonor@gmail.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})

