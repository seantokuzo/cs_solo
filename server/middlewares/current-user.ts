import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserDoc } from '../models/user'

interface UserPayload {
  id: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDoc
    }
  }
}

export interface CurrentUserReq extends Request {
  currentUser?: UserDoc
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload

    const user = await User.findById(payload.id)

    if (!user) {
      return next()
    }
    req.currentUser = user
  } catch (err) {
    console.log(err)
  }

  next()
}
