import { Schema, model } from 'mongoose'

const videoSchema = Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    video: { type: String, required: true },
    views: { type: Number, default: 0 },
    dislikes: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
}, { timestamps: true })

const videoModel = model('Video', videoSchema)
export default videoModel