const request = require('supertest');

const app = require('../../src/app');

const email = `${Date.now()}@mail.com`;

test('should list all users ', () => {
    return request(app).get('/users')
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            //expect(res.body[0]).toHaveProperty('name', 'jr');
        });
});

test('should insert user successfully', () => {
    return request(app).post('/users')
        .send({ name: "jack", email, password: "123" })
        .then(res => {
            expect(res.status).toBe(201)
            expect(res.body.name).toBe('jack');
        });
});

test('should not enter unnamed user', () => {
    return request(app).post('/users')
        .send({ email: 'jr@gmail.com', password: "123" })
        .then(res => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Name é um atributo obrigatório')
        });
});

test('should not user without email', async () => {
    const result = await request(app).post('/users')
        .send({ name: "Kelly", password: "123" });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('should not user without password', (done) => {
    request(app).post('/users')
        .send({ name: "divina", email: 'divina@gmail.com' })
        .then(res => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Password é um atributo obrigatório')
            done();
        })
});

test('should not user with existing email', () => {
    return request(app).post('/users')
        .send({ name: "jack", email, password: "123" })
        .then(res => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Já existe um usuário com este email');
        });
});