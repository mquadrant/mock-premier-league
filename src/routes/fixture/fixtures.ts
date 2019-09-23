import express from 'express'
import adminAccess from './../../middleware/admin-access'
import checkAuth from './../../middleware/check-auth'
const router = express.Router()
import {
    addFixture,
    getAllFixtures,
    removeFixture,
    editFixture,
    viewSingleFixture,
} from '../../controllers/fixturesController'

/* POST create fixture. */
router.post('/', checkAuth, adminAccess, addFixture)
/* GET fixture . */
router.get('/', checkAuth, getAllFixtures)
/* GET single fixture. */
router.get('/:fixtureId', checkAuth, removeFixture)
/* PATCH fixture updating. */
router.patch('/:fixtureId', checkAuth, adminAccess, editFixture)
/* DELETE deleting a fixture by id. */
router.delete('/:fixtureId', checkAuth, adminAccess, viewSingleFixture)

export default router
