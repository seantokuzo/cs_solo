import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors())
  }
  console.error('❌ Not Custom Error', err)
  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  })
}
