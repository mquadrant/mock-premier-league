import express from 'express'
const router = express.Router()
import {
    addTeam,
    getAllTeams,
    removeTeam,
    editTeam,
    viewSingleTeam,
} from '../../controllers/teamsController'

/* POST create team. */
router.post('/', addTeam)
/* GET Teams . */
router.get('/', getAllTeams)
/* GET single Team. */
router.get('/:teamId', viewSingleTeam)
/* PATCH Team updating. */
router.patch('/:teamId', editTeam)
/* DELETE deleting a team by id. */
router.delete('/:teamId', removeTeam)

export default router
