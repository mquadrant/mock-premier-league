import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import env from './config'

import indexRouter from './routes/index'

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//Connection to mongoDB
const uri = `${env.databaseURL}`
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')
})
connection.once('open', () => {})
connection.on('error', () => {
    console.log('Error Connecting To Database')
})

//REST route
app.use('/api/v1', indexRouter)

// catch 404 and forward to error handler
app.use(function(_req: Request, _res: Response, next: NextFunction) {
    next(createError(404))
})

// error handler
app.use(function(err: any, req: Request, res: Response, _next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

export default app
