import { Schema, model } from 'mongoose'

const userSchema = Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    detail: { type: String, default: '' },
    image: { type: String, default: '' },
    subscribers: { type: [String], default: [] },
    subscribed: { type: [String], default: [] },
    fromGoogle: { type: Boolean, default: false }
}, { timestamps: true })

const userModel = model('User', userSchema)
export default userModel