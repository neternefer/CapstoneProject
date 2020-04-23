//Testing part of allClear function logic
import { app } from '../server/server'
import { request } from 'express';

describe('Test endpoint', () => {
    test('test if index.html is reached', async () => {
        const response = await request(app)
        .get('/')
        .send('./dist/index.html')
    expect(response.statusCode).toBe(200)
    });
});
