const request = require('supertest');

const app = require('../src/app');

test('should response on root ', () => {
    return request(app).get('/')
        .then(res => {
            expect(res.status).toBe(200)
        });
});