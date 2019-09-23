import express from 'express'
import bcrypt from 'bcrypt'
import User from './../../models/users'
import jwt from 'jsonwebtoken'
import env from './../../config'

const router = express.Router()

/* POST user Logging in (Logging In). */
router.post('/login', async function(req, res, _next) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(409).json({
                status: 'Login failed',
            })
        } else {
            const isEqual = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!isEqual) {
                return res.status(409).json({
                    status: 'Login failed',
                })
            } else {
                const token = jwt.sign(
                    { userId: user.id, email: user.email, role: user.role },
                    env.jwtSecret!,
                    {
                        expiresIn: '4h',
                    }
                )
                return res.status(200).json({
                    message: 'successfully logged In',
                    userId: user.id,
                    token: token,
                    tokenExpiration: 4,
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong!',
        })
    }
})

export default router
