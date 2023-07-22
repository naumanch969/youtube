import Video from '../models/video.js'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { error } from '../utils/error.js'


export const getVideos = async (req, res, next) => {
    try {
        
        const videos = await Video.find()
        res.status(200).json({ result: videos, success: true, message: 'Videos fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getVideos`))
    }
}

export const getVideo = async (req, res, next) => {
    try {

        const { videoId } = req.params

        const video = await Video.findById(videoId)
        if (!video) return next(error(400, 'video not exist'))

        res.status(200).json({ result: video, success: true, message: 'Video fetched successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getVideo`))
    }
}

export const getTrendedVideos = async (req, res, next) => {
    try {

        const videos = await Video.find().sort({ views: -1 })

        res.status(200).json({ result: videos, success: true, message: 'Video fetched successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getVideo`))
    }
}

export const getRandomVideos = async (req, res, next) => {
    try {

        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
 
        res.status(200).json({ result: videos, success: true, message: 'Random videos fetched successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getVideo`))
    }
}

export const subscribedVideos = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id)
        const subscribedUsers = user.subscribed
        const list = await Promise.all(subscribedUsers.map(channelId => {
            return Video.find({ userId: channelId })
        }))
        res.status(200).json({ result: list.flat().sort((a, b) => a.createdAt - b.createdAt), success: true, message: 'Video fetched successfully' })
// .flat() is used to remove the higher array. i.e., [{}] --> {}

    } catch (err) {
        next(error(500, `${err.message} - getVideo`))
    }
}

export const getVideosByTag = async (req, res, next) => {
    try {
        const queryTags = req.query.tags.split(',')

        const videos = await Video.find({ tags: { $in: queryTags } }).limit(40)

        res.status(200).json({ result: videos, success: true, message: 'Video fetched successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getVideo`))
    }
}

export const searchByTitle = async (req, res, next) => {
    try {

        const query = req.query.q
        const videos = await Video.find({ title: { $regex: query, $options: 'i' } }).limit(40)

        res.status(200).json({ result: videos, success: true, message: 'Video fetched successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getVideo`))
    }
}


export const createVideo = async (req, res, next) => {
    try {

        const result = await Video.create({ userId: req.user._id, ...req.body })
        res.status(200).json({ result, success: true, message: 'Video created successfully' })

    } catch (err) {
        next(error(500, `${err.message} - updateVideo`))
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const { videoId } = req.params

        const video = await Video.findById(videoId)
        if (!video) return next(error(400, 'Video not exist'))

        if (String(req.user._id) != String(video.userId)) return next(error(400, 'you can update only your video'))

        const result = await Video.findByIdAndUpdate(videoId, { $set: req.body }, { new: true })
        res.status(200).json({ result, success: true, message: 'Video updated successfully' })

    } catch (err) {
        next(error(500, `${err.message} - updateVideo`))
    }
}

export const addView = async (req, res, next) => {
    try {

        const { videoId } = req.params

        const video = await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } }, { new: true })

        res.status(200).json({ result: video, success: true, message: 'view incremented successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getVideo`))
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const { videoId } = req.params

        const video = await Video.findById(videoId)
        if (!video) return next(error(400, 'Video not exist'))

        if (String(req.user._id) != String(video.userId)) return next(error(400, 'you can update only your video'))

        const result = await Video.findByIdAndDelete(videoId, { $set: req.body }, { new: true })
        res.status(200).json({ result, success: true, message: 'Video deleted successfully' })

    } catch (err) {
        next(error(500, `${err.message} - deleteVideo`))
    }
}