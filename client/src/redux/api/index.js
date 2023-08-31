import axios from 'axios'
import { baseURL } from '../../constant.js'
import Cookie from 'js-cookie'

const API = axios.create({ baseURL })

API.interceptors.request.use((req) => {
    const profile = Cookie.get('profile')
    if (profile) {
        const user = JSON.parse(profile)
        req.headers.authtoken = user.token
    }
    return req
})

export const register = (userData) => API.post(`/user/register`, userData)
export const login = (userData) => API.put(`/user/login`, userData)
export const googleLogin = (userData) => API.put(`/user/google`, userData)

export const getUsers = () => API.get(`/user/all`)
export const getCertainUsers = (userIds) => API.get(`/user/certain`, userIds)
export const getUser = (userId) => API.get(`/user/get/get/${userId}`)
export const updateUser = (userId, userData) => API.put(`/user/update/update/${userId}`, userData)
export const subscribe = (channelUserId) => API.put(`/user/subscribe/subscribe/${channelUserId}`)
export const unsubscribe = (channelUserId) => API.put(`/user/unsubscribe/unsubscribe/${channelUserId}`)
export const likeVideo = (videoId) => API.put(`/user/like/like/${videoId}`)
export const dislikeVideo = (videoId) => API.put(`/user/dislike/dislike/${videoId}`)
export const deleteUser = (userId) => API.delete(`/user/delete/delete/${userId}`)


export const getVideos = () => API.get(`/video/get-all`)
export const getVideo = (videoId) => API.get(`/video/get-single/${videoId}`)
export const getTrendedVideos = () => API.get(`/video/get/trend`)
export const getRandomVideos = () => API.get(`/video/get/random`)
export const subscribedVideos = () => API.get(`/video/get/subscribed`)
export const getVideosByTag = (tags) => API.get(`/video/search/tags?tags=${tags.map(tag => tag + ',')}`)
export const searchByTitle = (query) => API.get(`/video/search/title?q=${query}`)
export const createVideo = (videoData) => API.put(`/video/create`,videoData)
export const updateVideo = (videoId) => API.put(`/video/update/${videoId}`)
export const addView = (videoId) => API.put(`/video/update/view/${videoId}`)
export const deleteVideo = (videoId) => API.delete(`/video/delete/${videoId}`)


export const getComments = () => API.get(`get/:videoId`)
export const createComment = (commentData) => API.post(`create`, commentData)
export const updateComment = (commentId, commentData) => API.put(`update/${commentId}`, commentData)
export const deleteComment = (commentId) => API.delete(`delete/${commentId}`)