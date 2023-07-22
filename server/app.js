import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"

import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentRoutes from './routes/comment.js'

dotenv.config()
const app = express()
const CONNECTION_URL = process.env.ATLAS_URL
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/user', userRoutes)
app.use('/comment', commentRoutes)
app.use('/video', videoRoutes)

// error handler middleware
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Something went wrong!'
    return res.status(500).json({ message, status, success: false, stack: err.stack })
})

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('listening at port', PORT)))
    .catch((err) => console.log('error in connnecting with MongoDB = \n', err))