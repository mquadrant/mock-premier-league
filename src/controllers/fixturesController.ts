import Fixture from '../models/fixtures'
import { Request, Response, NextFunction } from 'express'
import { validateFixture } from '../routes/fixture/fixtureValidation'
import Teams from '../models/teams'

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
export const removeFixture = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    try {
        const fixture = await Fixture.findOne({ _id: req.params.fixtureId })
        if (!fixture) {
            return res.status(401).json({
                status: 'fail',
                message: "Fixture doesn't exist!",
            })
        }
        await Fixture.deleteOne({ _id: req.params.fixtureId })
        return res.status(204).json({
            status: 'success',
        })
    } catch (error) {
        return res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

//Updating a fixture
export const editFixture = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    let clone = Object.assign({}, req.body)
    delete clone.userData
    try {
        const fixtureExist = await Fixture.findById(req.params.fixtureId)
        if (!fixtureExist) {
            return res.status(401).json({
                status: 'fail',
                message: "Fixture doesn't exist!",
            })
        }
        const fixture = await Fixture.findByIdAndUpdate(
            req.params.fixtureId,
            clone,
            { new: true }
        )
        return res.status(201).json({
            status: 'success',
            data: fixture,
        })
    } catch (error) {
        return res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

//Viewing a single fixture
export const viewSingleFixture = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    try {
        const fixture = await Fixture.findById(req.params.fixtureId)
            .populate({
                path: 'homeTeam',
                model: Teams,
                select: '-createdAt -updatedAt -__v',
            })
            .populate({
                path: 'awayTeam',
                model: Teams,
                select: '-createdAt -updatedAt -__v',
            })
        if (!fixture) {
            return res.status(404).json({
                status: 'fail',
                message: 'Fixture does not exist',
            })
        } else {
            return res.status(200).json({
                status: 'success',
                data: fixture,
            })
        }
    } catch (error) {
        return res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}
