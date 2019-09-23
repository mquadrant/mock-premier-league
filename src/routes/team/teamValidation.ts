import Joi from 'joi'

function validateTeam(createTeam: Express.Request) {
    // define joi validation schema for Team
    const schema = Joi.object().keys({
        clubName: Joi.string().required(),
        about: Joi.string(),
        arena: Joi.string().required(),
        owner: Joi.string(),
        headCoach: Joi.string().required(),
        founded: Joi.string(),
        nickName: Joi.string(),
        players: Joi.array().items(
            Joi.object().keys({
                playerName: Joi.string(),
                position: Joi.string(),
                shirtNo: Joi.number(),
            })
        ),
    })
    return Joi.validate(createTeam, schema)
}

function validateEditTeam(editTeam: Express.Request) {
    // define joi validation schema for Team
    const schema = Joi.object().keys({
        clubName: Joi.string(),
        about: Joi.string(),
        arena: Joi.string(),
        owner: Joi.string(),
        headCoach: Joi.string(),
        founded: Joi.string(),
        nickName: Joi.string(),
        players: Joi.array().items(
            Joi.object().keys({
                playerName: Joi.string(),
                position: Joi.string(),
                shirtNo: Joi.number(),
            })
        ),
    })
    return Joi.validate(editTeam, schema)
}

export { validateTeam, validateEditTeam }
