import express from 'express'
import { getVideo, getVideos, createVideo, updateVideo, deleteVideo, getRandomVideos, subscribedVideos, getTrendedVideos, addView, getVideosByTag, searchByTitle } from '../controllers/video.js'
import { verifyToken, verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.get('/get-all', verifyToken, getVideos)
router.get('/get-single/:videoId', verifyToken, getVideo)
router.get('/get/trend', verifyToken, getTrendedVideos)
router.get('/get/random', verifyToken, getRandomVideos)
router.get('/get/subscribed', verifyToken, subscribedVideos)
router.get('/search/tags', verifyToken, getVideosByTag)
router.get('/search/title', verifyToken, searchByTitle)

router.put('/create', verifyToken, createVideo)

router.put('/update/:videoId', verifyToken, updateVideo)
router.put('/update/view/:videoId', verifyToken, addView)

router.delete('/delete/:videoId', verifyToken, verifyUser, deleteVideo)

export default router