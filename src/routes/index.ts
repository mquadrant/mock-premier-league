import express from 'express'
import usersRouter from './user/users'
const router = express.Router()

/* GET home page. */
router.get('/', function(_req, res, _next) {
    res.send({ message: 'Mock Premier League Api homepage' })
})

/* USER Routes. */
router.use('/users', usersRouter)

export default router
