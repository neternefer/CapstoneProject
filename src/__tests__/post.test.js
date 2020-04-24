const app = require('../server/server');
const supertest = require('supertest');
const request = supertest(app);

it('test if index.html is reached', async done => {
        const response = await request
        .get('/')
        .send('./dist/index.html')
    expect(response.statusCode).toBe(200);
    done();
    });

