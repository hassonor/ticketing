import request from 'supertest';
import {app} from '../../app';

it('clears the cookie after signing out', async () => {
    // First, sign up a user to have a valid session
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    // Then, sign out the user
    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);

    // Verify that the Set-Cookie header is set to null session
    expect(response.get('Set-Cookie')![0]).toMatch(
        /^session=; path=\/; expires=Thu, 01 Jan 1970 00:00:00 GMT/
    );
    expect(response.get('Set-Cookie')).toBeDefined();
});
