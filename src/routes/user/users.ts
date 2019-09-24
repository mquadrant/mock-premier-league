import express from 'express'
const router = express.Router()
import { userSignup } from '../../controllers/usersController'

/* GET users listing. */
router.get('/', function(_req, res, _next) {
    res.send('respond with a resource')
})

/* POST user creating (Sign up). */
router.post('/signup', userSignup)

export default router
