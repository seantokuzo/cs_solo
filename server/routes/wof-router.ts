import express from 'express'
import {
  deleteUser,
  getCurrentUser,
  updateUser,
} from '../controllers/user-controller'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'
import {
  // deleteCurrentGame,
  getCurrentGame,
  // updateCurrentGame,
} from '../controllers/wof-controller'

const router = express.Router()

// router.use(currentUser)
// router.use(requireAuth)
router.get('/', getCurrentGame)

// router.patch('/', updateCurrentGame)
// router.delete('/', deleteCurrentGame)

export default router
