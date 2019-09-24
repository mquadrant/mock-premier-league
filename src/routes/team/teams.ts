import express from 'express'
import adminAccess from './../../middleware/admin-access'
import checkAuth from './../../middleware/check-auth'
const router = express.Router()
import {
    addTeam,
    getAllTeams,
    removeTeam,
    editTeam,
    viewSingleTeam,
} from '../../controllers/teamsController'

/* POST create team. */
router.post('/', checkAuth, adminAccess, addTeam)
/* GET Teams . */
router.get('/', checkAuth, getAllTeams)
/* GET single Team. */
router.get('/:teamId', checkAuth, viewSingleTeam)
/* PATCH Team updating. */
router.patch('/:teamId', checkAuth, adminAccess, editTeam)
/* DELETE deleting a team by id. */
router.delete('/:teamId', checkAuth, adminAccess, removeTeam)

export default router
