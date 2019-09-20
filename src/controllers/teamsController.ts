import Team from '../models/teams'
import { Request, Response, NextFunction } from 'express'
import { validateTeam } from '../routes/team/teamValidation'

export const addTeam = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    // const { userId } = req.body.userData
    let clone = Object.assign({}, req.body)
    delete clone.userData
    const { error } = validateTeam(clone)
    if (error) {
        // send a 422 error response if validation fails
        return res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            data: clone,
        })
    } else {
        try {
            const team = await new Team({
                ...req.body,
            }).save()
            return res.status(201).json({
                status: 'success',
                message: 'successfully saved',
                data: team,
            })
        } catch (error) {
            return res.status(500).json({
                status: 'fail',
                error: 'Something went wrong',
            })
        }
    }
}

export const getAllTeams = async function(
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    try {
        const teams = await Team.find({})
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

export const removeTeam = async function(
    req: Request,
    res: Response,
    _next: NextFunction
) {
    try {
        const team = await Team.findOne({ _id: req.params.teamId })
        if (!team) {
            return res.status(401).json({
                status: 'fail',
                message: "Team doesn't exist!",
            })
        }
        await Team.deleteOne({ _id: req.params.teamId })
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
