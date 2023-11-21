import express from 'express'
import {
  signin,
  signout,
  revokeDiscordToken,
} from '../controllers/auth-controller'

const router = express.Router()

router.post('/signin', signin)
router.post('/signout', signout)
router.post('/revoke', revokeDiscordToken)

export default router
