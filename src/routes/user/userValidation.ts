import Joi from 'joi'

function validateSignup(createUser: Express.Request) {
    // define joi validation schema for User
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
    return Joi.validate(createUser, schema)
}

export { validateSignup }
