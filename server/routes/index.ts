import express from 'express'
import authRouter from './auth-router'
import userRouter from './user-router'
import wofRouter from './wof-router'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/me', userRouter)
router.use('/wof', wofRouter)

export default router
