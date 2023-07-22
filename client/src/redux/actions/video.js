import {
    start,
    error,
    end,
    getVideosReducer,
    getVideoReducer,
    getTrendedVideosReducer,
    getRandomVideosReducer,
    subscribedVideosReducer,
    getVideosByTagReducer,
    searchByTitleReducer,
    createVideoReducer,
    updateVideoReducer,
    addViewReducer,
    deleteVideoReducer,
} from "../reducers/video";
import * as api from '../api/index'


export const getVideos = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getVideos()
        dispatch(getVideosReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getVideo = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getVideo()
        dispatch(getVideoReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getTrendedVideos = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getTrendedVideos()
        dispatch(getTrendedVideosReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getRandomVideos = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getRandomVideos()
        dispatch(getRandomVideosReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const subscribedVideos = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.subscribedVideos()
        dispatch(subscribedVideosReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const getVideosByTag = (tags) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.getVideosByTag(tags)
        dispatch(getVideosByTagReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const searchByTitle = (query) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.searchByTitle(query)
        dispatch(searchByTitleReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const createVideo = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.createVideo()
        dispatch(createVideoReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const updateVideo = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateVideo()
        dispatch(updateVideoReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const addView = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.addView()
        dispatch(addViewReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}
export const deleteVideo = () => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.deleteVideo()
        dispatch(deleteVideoReducer(data.result))
    } catch (err) {
        dispatch(error(err.message))
    }
    dispatch(end())
}