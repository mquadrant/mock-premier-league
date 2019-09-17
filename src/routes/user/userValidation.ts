import Joi from 'joi'

function validateSignup(createUser: Express.Request) {
    // define joi validation schema for User
    const schema = Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string(),
    })
    return Joi.validate(createUser, schema)
}
