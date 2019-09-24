import Joi from 'joi'

function validateFixture(editFixture: Express.Request) {
    // define joi validation schema for Team
    const schema = Joi.object().keys({
        homeTeam: Joi.string().required(),
        awayTeam: Joi.string().required(),
        homeGoals: Joi.number(),
        awayGoals: Joi.number(),
        matchTime: Joi.string().required(),
        stadium: Joi.string(),
        referee: Joi.string(),
        isPlayed: Joi.boolean(),
        Attendance: Joi.string(),
    })
    return Joi.validate(editFixture, schema)
}

export { validateFixture }
