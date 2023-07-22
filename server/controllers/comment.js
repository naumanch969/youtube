import Comment from '../models/comment.js'
import Video from '../models/video.js'
import bcrypt from 'bcryptjs'
import { error } from '../utils/error.js'


export const getComments = async (req, res, next) => {
    try {
        const { videoId } = req.params

        const comments = await Comment.find({ videoId: videoId })
        res.status(200).json({ result: comments, success: true, message: 'Comments fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getComments`))
    }
}


export const createComment = async (req, res, next) => {
    try {

        const { videoId, descrption } = req.body

        const result = await Comment.create({ userId: req.user._id, videoId, descrption })
        res.status(200).json({ result, success: true, message: 'Comment created successfully' })

    } catch (err) {
        next(error(500, `${err.message} - updateComment`))
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const { videoId } = req.params

        const comment = await Comment.find({ videoId })
        if (!comment) return next(error(400, 'Comment not exist'))

        const video = await Video.findById(videoId)
        if (!video) return next(error(400, 'Video not exist'))

        if (req.user._id != comment.userId && req.user._id != video.userId) return next(error(403, 'you can update only your comment or admin can update it'))

        const result = await Comment.findByIdAndUpdate(videoId, { $set: req.body }, { new: true })
        res.status(200).json({ result, success: true, message: 'Comment updated successfully' })

    } catch (err) {
        next(error(500, `${err.message} - updateComment`))
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const { videoId } = req.params

        const comment = await Comment.findById({ videoId })
        if (!comment) return next(error(400, 'Comment not exist'))

        const video = await Video.findById(videoId)
        if (!video) return next(error(400, 'Video not exist'))

        if (req.user._id != comment.userId && req.user._id != video.userId) return next(error(403, 'you can delete only your comment or admin can update it'))

        const result = await Comment.findByIdAndDelete(videoId)
        res.status(200).json({ result, success: true, message: 'Comment updated successfully' })

    } catch (err) {
        next(error(500, `${err.message} - deleteComment`))
    }
}