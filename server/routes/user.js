import express from 'express'
import { register, login, getUsers, getCertainUsers, googleLogin, getUser, updateUser, deleteUser, subscribe, unsubscribe, likeVideo, dislikeVideo } from '../controllers/user.js'
import { verifyToken, verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.put('/login', login)
router.put('/google', googleLogin)

router.get('/all', getUsers)
router.get('/certain', getCertainUsers)
router.get('/get/:userId', getUser)

router.put('/update/:userId', verifyToken, verifyUser, updateUser)

router.put('/subscribe/:channelUserId', verifyToken, subscribe)
router.put('/unsubscribe/:channelUserId', verifyToken, unsubscribe)
router.put('/like/:videoId', verifyToken, likeVideo)
router.put('/dislike/:videoId', verifyToken, dislikeVideo)

router.delete('/delete/:userId', verifyToken, verifyUser, deleteUser)

export default router