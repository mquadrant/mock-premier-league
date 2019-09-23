import express from 'express'
import usersRouter from './user/users'
import authRouter from './auth/auth'
import teamRouter from './team/teams'
import fixtureRouter from './fixture/fixtures'
import searchRouter from './search/search'
const router = express.Router()

/* GET home page. */
router.get('/', function(_req, res, _next) {
    res.send({ message: 'Mock Premier League Api homepage' })
})

/* USER Routes. */
router.use('/users', usersRouter)

/* USER Auth Routes. */
router.use('/auth', authRouter)

/* TEAM Routes. */
router.use('/teams', teamRouter)

/* FIXTURE Routes. */
router.use('/fixtures', fixtureRouter)

/* SEARCH Routes. */
router.use('/search', searchRouter)

export default router
