import User from '../models/user.js'
import Video from '../models/video.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { error } from '../utils/error.js'

export const register = async (req, res, next) => {
    try {

        const { username, email, password } = req.body

        const isEmailExist = await User.findOne({ email })
        if (Boolean(isEmailExist)) return next(error(400, 'Email already registered'))

        const isValidEmail = validator.isEmail(email)
        if (!isValidEmail) return next(error(400, 'Invalid email'))

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ username, email, password: hashedPassword })
        res.status(200).json({ result, success: true, message: 'Registered successfully' })

    } catch (err) {
        next(error(500, `${err.message} - register `))
    }
}



export const login = async (req, res, next) => {
    try {

        const { email, password: input_password } = req.body

        const isValidEmail = validator.isEmail(email)
        if (!isValidEmail) return next(error(400, 'Invalid email'))

        const user = await User.findOne({ email })
        if (!user) return next(error(400, 'wrong email'))

        const isPasswordCorrect = bcrypt.compare(input_password, user.password)
        if (!isPasswordCorrect) return next(error(400, 'Invalid password'))

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        const { password, ...result } = user._doc
        res.cookie('authtoken', token, { httpOnly: true }).status(200).json({ result: { ...result }, success: true, message: 'Logged In successfully' })

    } catch (err) {
        next(error(500, `${err.message} - login`))
    }
}



export const googleLogin = async (req, res, next) => {
    try {

        const { email, image, username } = req.body

        const user = await User.findOne({ email })
        if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

            const { password, ...result } = user._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json({ result, success: true, message: 'Logged In successfully' })
        }
        else {
            const newUser = await User.create({ username, email, image, fromGoogle: true })
            const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

            const { password, ...result } = newUser._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json({ result, success: true, message: 'Logged In successfully' })
        }

    } catch (err) {
        next(error(500, `${err.message} - login`))
    }
}



export const getUsers = async (req, res, next) => {
    try {

        const users = await User.find()
        res.status(200).json({ result: users, success: true, message: 'Users fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getUsers`))
    }
}
export const getCertainUsers = async (req, res, next) => {
    try {
        const { userIds } = req.body

        const users = await Promise.all(userIds.map(userId => {
            return User.findById(userId)
        }))
        res.status(200).json({ result: users, success: true, message: 'Users fetched successfully' })

    } catch (err) {
        next(error(500, `${err.message} - getUsers`))
    }
}

export const getUser = async (req, res, next) => {
    try {

        const { userId } = req.params

        const user = await User.findById(userId)
        if (!user) return next(error(400, 'user not exist'))

        const { password, ...result } = user._doc
        res.status(200).json({ result, success: true, message: 'User fetched successfully' })


    } catch (err) {
        next(error(500, `${err.message} - getUser`))
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params

        const user = await User.findById(userId)
        if (!user) return next(error(400, 'User not exist'))

        if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true })
        const { password, ...result } = updatedUser._doc
        res.status(200).json({ result, success: true, message: 'User updated successfully' })

    } catch (err) {
        next(error(500, `${err.message} - updateUser`))
    }
}

export const subscribe = async (req, res, next) => {
    try {
        const { channelUserId } = req.params

        await User.findByIdAndUpdate(req.user._id, { $push: { subscribed: channelUserId } }, { new: true })

        await User.findByIdAndUpdate(channelUserId, { $push: { subscribers: req.user._id } }, { new: true })

        res.status(200).json({ result, success: true, message: 'subscription successfully' })

    } catch (err) {
        next(error(500, `${err.message} - updateUser`))
    }
}


export const unsubscribe = async (req, res, next) => {
    try {
        const { channelUserId } = req.params

        await User.findByIdAndUpdate(req.user._id, { $pull: { subscribed: channelUserId } }, { new: true })

        await User.findByIdAndUpdate(channelUserId, { $pull: { subscribers: req.user._id } }, { new: true })

        res.status(200).json({ result, success: true, message: 'unsubscription successfully' })

    } catch (err) {
        next(error(500, `${err.message} - updateUser`))
    }
}

export const likeVideo = async (req, res, next) => {
    try {
        const { videoId } = req.params
        const userId = req.user._id

        const result = await Video.findByIdAndUpdate(videoId, { $addToSet: { likes: userId }, $pull: { dislikes: userId } }, { new: true })

        res.status(200).json({ result, success: true, message: 'like successfully' })

    } catch (err) {
        next(error(500, `${err.message} - likeVideo`))
    }
}

export const dislikeVideo = async (req, res, next) => {
    try {
        const { videoId } = req.params
        const userId = req.user._id

        const result = await Video.findByIdAndUpdate(videoId, { $addToSet: { dislikes: userId }, $pull: { likes: userId } }, { new: true })

        res.status(200).json({ result, success: true, message: 'dislike successfully' })

    } catch (err) {
        next(error(500, `${err.message} - dislikeVideo`))
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params

        await User.findByIdAndDelete(userId)
        res.status(200).json({ success: true, message: 'User deleted successfully' })

    } catch (err) {
        next(error(500, `${err.message} - deleteUser`))
    }
}