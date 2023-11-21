import { Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { CurrentUserReq } from './current-user'

export const requireAuth = (
  req: CurrentUserReq,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError()
  }

  next()
}
