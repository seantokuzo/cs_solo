import express from 'express'
import {
  getCurrentGame,
  getUserGame,
  updateUserGame,
} from '../controllers/wof-controller'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'

const router = express.Router()

router.use(currentUser)
router.use(requireAuth)
router.get('/', getCurrentGame)
router.get('/my-game', getUserGame)
router.patch('/my-game', updateUserGame)
// router.delete('/', deleteCurrentGame)

export default router
