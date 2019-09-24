import mongoose from 'mongoose'
import Team from '../teams'

const createdTeam = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    clubName: 'Manchester City',
    about: 'Manchester City Football Club',
    arena: 'Etihad Stadium',
    owner: 'City Football Group',
    headCoach: 'Pep Guardiola',
    founded: 'Founded in 1880',
    nickName: 'Mancity',
}

describe('Team model test', () => {
    test('Team has a module', () => {
        expect(Team).toBeDefined()
    })

    describe('Get Team Object from Model', () => {
        it('should get a team', () => {
            const team = new Team(createdTeam)
            expect(team.about).toBe(createdTeam.about)
            expect(team.founded).toBe(createdTeam.founded)
        })
    })
})
