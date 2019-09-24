import app from '../../app'
import request from 'supertest'
import Team from './../../models/teams'
import mongoose from 'mongoose'

let _id: any
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDg4Yjg1Yzg1MzlmZDhmMDMyZjg0Y2QiLCJlbWFpbCI6Im0ucXVhZHJhbnRAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY5MjgwODM3fQ.hr6HEg3du13UwD_-Y_GGtw8OCC3fJw2mCB8LpJbSCvA'

jest.setTimeout(30000)

afterAll(async () => {
    try {
        await Promise.all([Team.deleteMany({})])
    } catch (err) {
        return
    }
    await mongoose.connection.close()
})

describe('POST /api/v1/teams', () => {
    it('Should be defined', async () => {
        const response = await request(app).post('/api/v1/teams')
        expect(response).toBeDefined()
    })

    it('Should return response 422 if invalid data is sent', async () => {
        const res = await request(app)
            .post('/api/v1/teams')
            .set('Authorization', 'bearer ' + token)
            .send({
                nickName: 'Mancity',
            })
        expect(res.status).toBe(422)
    })

    it('should create a team', async () => {
        const createTeam = await request(app)
            .post(`/api/v1/teams`)
            .set('Authorization', 'bearer ' + token)
            .send({
                clubName: 'Manchester City',
                about:
                    'Manchester City Football Club is an English football club',
                arena: 'Etihad Stadium',
                owner: 'City Football Group',
                headCoach: 'Pep Guardiola',
                founded: 'Founded in 1880',
                nickName: 'Mancity',
            })
            .set('Application', 'application/json')
            .expect('Content-Type', /json/)
        _id = createTeam.body.data._id
        expect(createTeam.status).toBe(201)
        expect(createTeam.body.status).toBe('success')
    })
})

describe('GET /api/v1/teams', () => {
    it('should be defined', async () => {
        const response = await request(app).get('/api/v1/teams')
        expect(response.status).toBeDefined()
    })

    it('should get created teams', async () => {
        const getTeam = await request(app)
            .get('/api/v1/teams')
            .set('Authorization', 'bearer ' + token)
        expect(getTeam.status).toBe(200)
    })
})

describe('PATCH /api/v1/teams', () => {
    it('Should be defined', async () => {
        const response = await request(app).patch(`/api/v1/teams/${_id}`)
        expect(response.status).toBeDefined()
    })

    it('Should be return 404 if correct team Id is not supported ', async () => {
        const response = await request(app)
            .patch(`/api/v1/teams/123456789087665`)
            .set('Authorization', 'bearer ' + token)
            .send({
                founded: 'Founded in 1882',
                nickName: 'Mancity city',
            })
        expect(response.status).toBe(404)
    })

    it('Should be return success if all required fields are valid', async () => {
        const response = await request(app)
            .patch(`/api/v1/teams/${_id}`)
            .set('Authorization', 'bearer ' + token)
            .send({
                founded: 'Founded in 1882',
                nickName: 'Mancity city',
            })
        expect(response.status).toBe(201)
        expect(response.body.data.founded).toBe('Founded in 1882')
    })
})

describe('DELETE ENDPOINT', () => {
    it('Should delete created team', async () => {
        const response = await request(app)
            .delete(`/api/v1/teams/${_id}`)
            .set('Authorization', 'bearer ' + token)
        expect(response.status).toBe(204)
    })
})
