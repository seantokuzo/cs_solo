import { Request, Response } from 'express'
import { CurrentUserReq } from '../middlewares/current-user'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'

export const getCurrentUser = async (req: CurrentUserReq, res: Response) => {
  console.log('💥 Get Current User')
  const { currentUser } = req
  if (!currentUser) {
    return res.status(200).send({})
  }

  res.status(200).json(currentUser)
}

export const updateUser = async (req: Request, res: Response) => {
  console.log('💥 User Controller - Update User')

  res.status(200).json({})
}

export const deleteUser = async (req: Request, res: Response) => {
  console.log('💥 User Controller - Delete User')

  res.status(200).json({})
}
