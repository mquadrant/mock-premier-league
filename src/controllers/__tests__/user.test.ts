import app from '../../app'
import request from 'supertest'
import mongoose from 'mongoose'
import users from '../../models/users'

jest.setTimeout(30000)
afterAll(async () => {
    try {
        await Promise.all([users.deleteMany({})])
    } catch (err) {
        return
    }
    await mongoose.connection.close()
})

describe('POST /api/v1/users/signup', () => {
    it('Should be defined', async () => {
        const response = await request(app).post('/api/v1/users/signup')
        expect(response).toBeDefined()
    })

    it('Should created a standard user', async () => {
        const response = await request(app)
            .post('/api/v1/users/signup')
            .send({
                firstName: 'standard',
                lastName: 'User',
                email: 'userstandard@gmail.com',
                password: '12345',
                role: 'USER',
            })
        expect(response.status).toBe(201)
    })

    it('Should return 422 error when required field is not given', async () => {
        const response = await request(app)
            .post('/api/v1/users/signup')
            .send({
                lastName: 'User',
                email: 'userstandard@gmail.com',
                password: '12345',
            })
        expect(response.status).toBe(422)
    })
})
