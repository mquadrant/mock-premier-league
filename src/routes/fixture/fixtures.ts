import express from 'express'
const router = express.Router()
import {
    addFixture,
    getAllFixtures,
    removeFixture,
    editFixture,
    viewSingleFixture,
} from '../../controllers/fixturesController'

/* POST create fixture. */
router.post('/', addFixture)
/* GET fixture . */
router.get('/', getAllFixtures)
/* GET single fixture. */
router.get('/:fixtureId', removeFixture)
/* PATCH fixture updating. */
router.patch('/:fixtureId', editFixture)
/* DELETE deleting a fixture by id. */
router.delete('/:fixtureId', viewSingleFixture)

export default router
