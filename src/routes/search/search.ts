import express from 'express'
const router = express.Router()
import { getFixtures, getTeams } from '../../controllers/searchController'

/* GET Fixtures . */
router.get('/fixtures', getFixtures)
/* GET Teams */
router.get('/teams', getTeams)

export default router
