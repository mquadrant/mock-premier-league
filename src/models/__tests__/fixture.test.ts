import mongoose from 'mongoose'
import Fixture from '../fixtures'

const createdFixture = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    homeGoals: 2,
    awayGoals: 1,
    homeTeam: '5d4155cfcd68f4086d8df470',
    awayTeam: '5d4155cfcd68f4086d8df472',
    matchTime: '2019-09-10T01:30:20.000Z',
    stadium: 'Stamford Bridge, London',
    referee: 'Hilton Gate',
    isPlayed: true,
    Attendance: '140000',
}

describe('Fixture model test', () => {
    test('Fixture has a module', () => {
        expect(Fixture).toBeDefined()
    })

    describe('Get Fixture Object from Model', () => {
        it('should get a fixture', () => {
            const fixture = new Fixture(createdFixture)
            expect(fixture.Attendance).toBe(createdFixture.Attendance)
            expect(fixture.referee).toBe(createdFixture.referee)
        })
    })
})
