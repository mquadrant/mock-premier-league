import Fixture from '../models/fixtures'
import { Request, Response, NextFunction } from 'express'
import { validateFixture } from '../routes/fixture/fixtureValidation'

//Adding Fixture
export const addFixture = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    let clone = Object.assign({}, req.body)
    delete clone.userData
    const { error } = validateFixture(clone)
    if (error) {
        // send a 422 error response if validation fails
        return res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            data: clone,
        })
    } else {
        try {
            const fixture = await new Fixture({
                ...req.body,
            }).save()
            return res.status(201).json({
                status: 'success',
                message: 'successfully saved',
                data: fixture,
            })
        } catch (error) {
            return res.status(500).json({
                status: 'fail',
                error: 'Something went wrong',
            })
        }
    }
}

//Reading all fixture
export const getAllFixtures = async function(
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    try {
        const fixture = await Fixture.find({})
        if (!fixture) {
            return res.status(404).json({
                status: 'fail',
                message: 'No fixture found',
            })
        }
        return res.status(200).json({
            status: 'success',
            results: fixture.length,
            data: fixture,
        })
    } catch (error) {
        return res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

//Deleting fixture
export const removeFixture = function(
    req: Request,
    res: Response,
    next: NextFunction
) {}

//Updating a fixture
export const editFixture = function(
    req: Request,
    res: Response,
    next: NextFunction
) {}

//Viewing a single fixture
export const viewSingleFixture = function(
    req: Request,
    res: Response,
    next: NextFunction
) {}
