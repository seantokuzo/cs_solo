import express from 'express'
import { rateLimit } from 'express-rate-limit'
import {
  deleteUser,
  getCurrentUser,
  updateUser,
} from '../controllers/user-controller'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'

const cohortUpdateLimit = rateLimit({
  windowMs: 1000 * 60 * 60,
  limit: 1,
})

const router = express.Router()

router.get('/current-user', currentUser, getCurrentUser)

// TODO
router.use(currentUser)
router.use(requireAuth)

// DEMO
router.patch('/update-cohort', updateUser)
// router.patch('/update-cohort', cohortUpdateLimit, updateUser)

// TODO
router.delete('/delete', deleteUser)

export default router
