import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
dotenv.config()

import routes from './routes'

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
  return res.status(404).json({ err: 'Not Found' })
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).json({ err: err })
})

export { app }
