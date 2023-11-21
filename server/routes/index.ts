import express from 'express'
import authRouter from './auth-router'
import userRouter from './user-router'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/me', userRouter)

export default router
