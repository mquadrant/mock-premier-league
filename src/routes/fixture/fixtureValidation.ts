import Joi from 'Joi'

function validateFixture(editFixture: Express.Request) {
    // define joi validation schema for Team
    const schema = Joi.object().keys({
        homeTeam: Joi.string(),
        awayTeam: Joi.string(),
        homeGoals: Joi.number(),
        awayGoals: Joi.number(),
        matchTime: Joi.string(),
        stadium: Joi.string(),
        referee: Joi.string(),
        isPlayed: Joi.boolean(),
        Attendance: Joi.string(),
    })
    return Joi.validate(editFixture, schema)
}

export { validateFixture }
