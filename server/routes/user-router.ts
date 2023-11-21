import express from 'express'
import { deleteUser, updateUser } from '../controllers/user-controller'

const router = express.Router()

router.patch('/update', updateUser)
router.post('/delete', deleteUser)

export default router
