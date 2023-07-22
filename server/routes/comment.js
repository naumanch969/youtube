import express from 'express'
import { getComments, updateComment, deleteComment, createComment } from '../controllers/comment.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/:videoId', verifyToken, getComments)

router.post('/create', createComment)

router.put('/update/:commentId', verifyToken, updateComment)
router.delete('/delete/:commentId', verifyToken, deleteComment)

export default router