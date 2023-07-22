import { Schema, model } from 'mongoose'

const commentSchema = Schema({
    userId: { type: String, required: true },
    videoId: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true })

const commentModel = model('Comment', commentSchema)
export default commentModel