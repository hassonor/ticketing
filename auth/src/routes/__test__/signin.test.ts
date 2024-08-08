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
    const email = 'test@test.com';
    const password = 'password';
    const hashedPassword = await PasswordManager.toHash(password);
    const user = User.build({email, password: hashedPassword});
    await user.save();

    await request(app)
        .post('/api/users/signin')
        .send({
            email: email,
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

it('sets a cookie after successful signin', async () => {
    const email = 'test@test.com';
    const password = 'password';
    const user = User.build({email, password});
    await user.save();

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: email,
            password: password
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
