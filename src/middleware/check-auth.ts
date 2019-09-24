import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import env from './../config/index'

/* User logging in. */
export default (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            throw new Error()
        }
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, env.jwtSecret!)
        req.body.userData = decoded
        next()
        return
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Auth failed',
            error: error,
        })
    }
}
