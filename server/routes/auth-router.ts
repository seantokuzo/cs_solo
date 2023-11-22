import express from 'express'
import {
  signin,
  signout,
  revokeDiscordToken,
} from '../controllers/auth-controller'

const router = express.Router()

router.get('/signin', signin)

// TODO
router.post('/signout', signout)
// TODO
router.post('/revoke', revokeDiscordToken)

export default router
