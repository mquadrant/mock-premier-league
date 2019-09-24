import bcrypt from 'bcrypt'
import User from '../models/users'
import { Request, Response, NextFunction } from 'express'
import { validateSignup } from '../routes/user/userValidation'

export const userSignup = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    const { error } = validateSignup(req.body)
    if (error) {
        // send a 422 error response if validation fails
        return res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            data: req.body,
        })
    } else {
        try {
            const isEmailExist = await User.findOne({ email: req.body.email })
            if (isEmailExist) {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Email already exist!',
                })
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                try {
                    const user = await new User({
                        ...req.body,
                        password: hashedPassword,
                    }).save()
                    return res.status(201).json({
                        status: 'success',
                        message: 'created successfully',
                        data: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            password: null,
                        },
                    })
                } catch (error) {
                    return res.status(500).json({
                        status: 'fail',
                        error: error,
                    })
                }
            }
        } catch (error) {
            return res.status(500).json({
                status: 'fail',
                error: error,
            })
        }
    }
}
