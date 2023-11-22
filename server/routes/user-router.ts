import express from 'express'
import {
  deleteUser,
  getCurrentUser,
  updateUser,
} from '../controllers/user-controller'
import { currentUser } from '../middlewares/current-user'

const router = express.Router()

router.get('/current-user', currentUser, getCurrentUser)

// TODO
router.patch('/update', updateUser)
// TODO
router.post('/delete', deleteUser)

export default router
