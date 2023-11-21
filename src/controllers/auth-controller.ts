import { Request, Response } from 'express'

export const signin = async (req: Request, res: Response) => {
  console.log('💥 authController - Sign In')

  res.status(200).json({})
}

export const signout = async (req: Request, res: Response) => {
  console.log('💥 authController - Sign Out')

  res.status(200).json({})
}

export const revokeDiscordToken = async (req: Request, res: Response) => {
  console.log('💥 authController - Revoke Discord Token')

  res.status(200).json({})
}
