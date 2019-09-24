import RateLimit from 'express-rate-limit'

const limiter = new RateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    message: 'Too many Request Please Try again in 5 minutes time',
})

export default limiter
