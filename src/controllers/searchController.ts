import Fixture from '../models/fixtures'
import Team from '../models/teams'
import { Request, Response, NextFunction } from 'express'

export const getFixtures = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    try {
        //Build Query
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(element => delete queryObj[element])
        let query = Fixture.find(queryObj)

        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        //Field Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        //Pagination
        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 30
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if (req.query.page) {
            const numfixtures = await Fixture.countDocuments()
            if (skip >= numfixtures) {
                throw new Error('This page does not exist')
            }
        }
        const fixtures = await query

        if (!fixtures) {
            return res.status(404).json({
                status: 'fail',
                message: 'No fixture found',
            })
        }
        return res.status(200).json({
            status: 'success',
            results: fixtures.length,
            data: fixtures,
        })
    } catch (error) {
        return res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

export const getTeams = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    try {
        //Build Query
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(element => delete queryObj[element])
        let query = Team.find(queryObj)

        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        //Field Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        //Pagination
        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 30
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if (req.query.page) {
            const numteams = await Fixture.countDocuments()
            if (skip >= numteams) {
                throw new Error('This page does not exist')
            }
        }
        const teams = await query

        if (!teams) {
            return res.status(404).json({
                status: 'fail',
                message: 'No team found',
            })
        }
        return res.status(200).json({
            status: 'success',
            results: teams.length,
            data: teams,
        })
    } catch (error) {
        return res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}
