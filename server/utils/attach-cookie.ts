import { Request } from 'express'
import jwt from 'jsonwebtoken'

export const attachCooke = (req: Request, payload: { id: string }) => {
  const userJwt = jwt.sign(
    {
      id: payload.id,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  )

  req.session = {
    jwt: userJwt,
  }
}
