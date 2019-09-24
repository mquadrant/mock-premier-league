import app from '../../app'
import request from 'supertest'
import Fixture from './../../models/fixtures'
import mongoose from 'mongoose'

let _id: any
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDg4Yjg1Yzg1MzlmZDhmMDMyZjg0Y2QiLCJlbWFpbCI6Im0ucXVhZHJhbnRAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY5MjgwODM3fQ.hr6HEg3du13UwD_-Y_GGtw8OCC3fJw2mCB8LpJbSCvA'

jest.setTimeout(30000)

afterAll(async () => {
    try {
        await Promise.all([Fixture.deleteMany({})])
    } catch (err) {
        return
    }
    await mongoose.connection.close()
})

describe('POST /api/v1/fixtures', () => {
    it('Should be defined', async () => {
        const response = await request(app).post('/api/v1/fixtures')
        expect(response).toBeDefined()
    })

    it('Should return response 422 if invalid data is sent', async () => {
        const res = await request(app)
            .post('/api/v1/fixtures')
            .set('Authorization', 'bearer ' + token)
            .send({
                homeGoals: '2',
                awayGoals: 1,
                matchTime: '2019-09-10T01:30:20.000Z',
                stadium: 'Stamford Bridge, London',
                referee: 'Hilton Gate',
            })

        expect(res.status).toBe(422)
    })

    it('should create fixture', async () => {
        const createFixture = await request(app)
            .post(`/api/v1/fixtures`)
            .set('Authorization', 'bearer ' + token)
            .send({
                homeGoals: 2,
                awayGoals: 1,
                homeTeam: '5d4155cfcd68f4086d8df470',
                awayTeam: '5d4155cfcd68f4086d8df472',
                matchTime: '2019-09-10T01:30:20.000Z',
                stadium: 'Stamford Bridge, London',
                referee: 'Hilton Gate',
                isPlayed: false,
                Attendance: '140000',
            })
            .set('Application', 'application/json')
            .expect('Content-Type', /json/)
        _id = createFixture.body.data._id
        expect(createFixture.status).toBe(201)
        expect(createFixture.body.status).toBe('success')
    })
})

describe('GET /api/v1/fixtures', () => {
    it('should be defined', async () => {
        const response = await request(app).get('/api/v1/fixtures')
        expect(response.status).toBeDefined()
    })

    it('should get created fixtures', async () => {
        const getFixture = await request(app)
            .get('/api/v1/fixtures')
            .set('Authorization', 'bearer ' + token)
        expect(getFixture.status).toBe(200)
        expect(getFixture.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ stadium: 'Stamford Bridge, London' }),
            ])
        )
    })
})

describe('PATCH /api/v1/fixtures', () => {
    it('Should be defined', async () => {
        const response = await request(app).patch(`/api/v1/fixtures/${_id}`)
        expect(response.status).toBeDefined()
    })

    it('Should be return 404 if fixture Id is not available ', async () => {
        const response = await request(app)
            .patch(`/api/v1/fixtures/123456789087665`)
            .set('Authorization', 'bearer ' + token)
            .send({
                referee: 'Hilton Gate Junior',
                isPlayed: true,
            })
        expect(response.status).toBe(404)
    })

    it('Should be return success if all required fields are correct', async () => {
        const response = await request(app)
            .patch(`/api/v1/fixtures/${_id}`)
            .set('Authorization', 'bearer ' + token)
            .send({
                homeGoals: 3,
                awayGoals: 3,
                isPlayed: true,
            })
        expect(response.status).toBe(201)
        expect(response.body.data.awayGoals).toBe(3)
        expect(response.body.data.isPlayed).toBe(true)
    })
})

describe('DELETE ENDPOINT', () => {
    it('Should delete create fixture', async () => {
        const response = await request(app)
            .delete(`/api/v1/fixtures/${_id}`)
            .set('Authorization', 'bearer ' + token)
        expect(response.status).toBe(204)
    })
})
