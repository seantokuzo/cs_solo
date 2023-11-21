import { Request, Response } from 'express'

export const updateUser = async (req: Request, res: Response) => {
  console.log('💥 User Controller - Update User')

  res.status(200).json({})
}

export const deleteUser = async (req: Request, res: Response) => {
  console.log('💥 User Controller - Delete User')

  res.status(200).json({})
}
