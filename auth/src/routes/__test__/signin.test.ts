import request from 'supertest';
import {app} from '../../app';
import {User} from '../../models/users';
import {PasswordManager} from '../../services/password';

it('fails when a non-existent email is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'nonexistent@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'hassonor@gmail.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'hassonor@gmail.com',
            password: 'incorrectpassword'
        })
        .expect(400);
});

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'invalid-email',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: ''
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({email: 'test@test.com'})
        .expect(400);

    await request(app)
        .post('/api/users/signin')
        .send({password: 'password'})
        .expect(400);
});

it('returns a 400 with invalid email and password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({email: 'testtest.com', password: 'password'})
        .expect(400);

    await request(app)
        .post('/api/users/signin')
        .send({email: 'test@test.com', password: '1'})
        .expect(400);
});

it('sets a cookie after successful signin', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'hassonor@gmail.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'hassonor@gmail.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
