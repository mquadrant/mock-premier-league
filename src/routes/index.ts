import express from 'express'
import usersRouter from './user/users'
import authRouter from './auth/auth'
import teamRouter from './team/teams'
import fixtureRouter from './fixture/fixtures'
import searchRouter from './search/search'
import limiter from './../middleware/rateLimiter'
const router = express.Router()

/* GET home page. */
router.get('/', function(_req, res, _next) {
    res.send({ message: 'Mock Premier League Api homepage' })
})

/* USER Routes. */
router.use('/users', limiter, usersRouter)

/* USER Auth Routes. */
router.use('/auth', limiter, authRouter)

/* TEAM Routes. */
router.use('/teams', limiter, teamRouter)

/* FIXTURE Routes. */
router.use('/fixtures', limiter, fixtureRouter)

/* SEARCH Routes. */
router.use('/search', searchRouter)

export default router
