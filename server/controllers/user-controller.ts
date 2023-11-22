import { Request, Response } from 'express'
import { CurrentUserReq } from '../middlewares/current-user'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { NotFoundError } from '../errors/not-found-error'

export const getCurrentUser = async (req: CurrentUserReq, res: Response) => {
  console.log('💥 Get Current User')
  const { currentUser } = req
  if (!currentUser) {
    return res.status(200).send({})
  }

  res.status(200).json(currentUser)
}

// TODO
export const updateUser = async (req: CurrentUserReq, res: Response) => {
  console.log('💥 User Controller - Update User')
  const { newNickname, newCohort } = req.body
  if (!req.currentUser) {
    throw new NotAuthorizedError()
  }

  if (newCohort) {
    const updatedUser = await User.findById(req.currentUser.id)
    if (!updatedUser) throw new NotFoundError()
    updatedUser.cohort = newCohort !== 'none' ? newCohort : ''
    await updatedUser.save()
    return res.status(200).send(updatedUser)
  }

  if (newNickname) {
    const updatedUser = await User.findById(req.currentUser.id)
    if (!updatedUser) throw new NotFoundError()
    updatedUser.username = newNickname
    await updatedUser.save()
    return res.status(200).send(updatedUser)
  }

  res.status(200).json({ message: 'update me' })
}

// TODO
export const deleteUser = async (req: Request, res: Response) => {
  console.log('💥 User Controller - Delete User')

  res.status(200).json({})
}
