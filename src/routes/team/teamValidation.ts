import Joi from 'joi'

function validateTeam(createTeam: Express.Request) {
    // define joi validation schema for Team
    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string(),
        role: Joi.string(),
        club: Joi.string(),
    })
    return Joi.validate(createTeam, schema)
}

export { validateTeam }
