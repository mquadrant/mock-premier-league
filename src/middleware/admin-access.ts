import express from 'express'

const adminAccess = function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (res.statusCode === 401 || res.statusCode === 403) {
        res.status(403)
            .send('Invalid Login details')
            .end()
        return
    }
    if (req.body.userData.role !== 'ADMIN') {
        res.status(403)
            .send('Access denied')
            .end()
        return
    }
    next()
    return
}
export default adminAccess
