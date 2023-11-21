import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
dotenv.config()

import routes from './routes'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'

const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5150',
  }),
)
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== 'development'
  }),
)

app.use('/api/v1', routes)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
